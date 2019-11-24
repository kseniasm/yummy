import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import RecipeDetailsHeader from "./RecipeDetailsHeader";
import RecipeDetailsInfo from "./RecipeDetailsInfo";
import RecipeDetailsReviews from "./RecipeDetailsReviews";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import {
  saveRecipe,
  unsaveRecipe,
  getUserRecipes
} from "../../../store/actions/userActions";
import {
  addRecipeReview,
  deleteRecipe
} from "../../../store/actions/recipeActions";
import { openModal } from "../../../store/actions/modalActions";
import Loading from "../../Loading";

class RecipeDetails extends Component {
  async componentDidMount() {
    const { firestore, match, history, auth } = this.props;

    let recipe = await firestore.get(`recipes/${match.params.id}`);

    if (auth.isLoaded && !auth.isEmpty) {
      await this.props.getUserRecipes(this.props.auth.uid, 2);
    }

    if (!recipe.exists) {
      history.push(`/recipes`); //could put a not found page
      toastr.error("Sorry", "Recipe not found");
    }
  }

  handleSaveRecipe = async recipe => {
    this.props.saveRecipe(recipe);

    await this.props.getUserRecipes(this.props.auth.uid, 2);
  };
  handleUnsaveRecipe = async recipe => {
    this.props.unsaveRecipe(recipe);

    await this.props.getUserRecipes(this.props.auth.uid, 2);
  };

  handleDeleteRecipe = async recipeId => {
    const { history, deleteRecipe } = this.props;

    await deleteRecipe(recipeId);

    history.push(`/recipes`);
  };

  render() {
    const {
      recipe,
      addRecipeReview,
      recipeReviews,
      auth,
      recipes,
      openModal
    } = this.props;

    if (Object.entries(recipe).length === 0) {
      return <Loading />;
    }

    const isOwner = recipe && recipe.postedBy.uid === auth.uid;
    const saved = recipes.filter(saved => saved.id === recipe.id).length !== 0;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Grid>
        <Grid.Column width={12}>
          <RecipeDetailsHeader
            recipe={recipe}
            isOwner={isOwner}
            saveRecipe={this.handleSaveRecipe}
            unsaveRecipe={this.handleUnsaveRecipe}
            deleteRecipe={this.handleDeleteRecipe}
            saved={saved}
            authenticated={authenticated}
            openModal={openModal}
          />
          <RecipeDetailsInfo recipe={recipe} />
          <RecipeDetailsReviews
            addRecipeReview={addRecipeReview}
            recipeId={recipe.id}
            recipeReviews={recipeReviews}
            isOwner={isOwner}
            authenticated={authenticated}
          />
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid>
    );
  }
}

const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
};


const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;

  let recipe = {};

  if (
    state.firestore.ordered.recipes &&
    state.firestore.ordered.recipes.length > 0
  ) {
    recipe =
      state.firestore.ordered.recipes.filter(
        recipe => recipe.id === recipeId
      )[0] || {};
  }

  return {
    recipe,
    auth: state.firebase.auth,
    recipes: state.recipes.userRecipes,
    recipeReviews:
      !isEmpty(state.firebase.data.recipe_review) &&
      objectToArray(state.firebase.data.recipe_review[ownProps.match.params.id])
  };
};



const actions = {
  saveRecipe,
  unsaveRecipe,
  addRecipeReview,
  deleteRecipe,
  getUserRecipes,
  openModal
};

export default compose(
  withFirestore,
  connect(mapStateToProps, actions),
  firebaseConnect(props => [`recipe_review/${props.match.params.id}`])
)(RecipeDetails);
