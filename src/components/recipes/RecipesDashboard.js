import React, { Component } from "react";
import { Container, Loader } from "semantic-ui-react";
import RecipesList from "./RecipesList";
import { connect } from "react-redux";
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesForDashboard
} from "../../store/actions/recipeActions";
import Loading from "../Loading";
import { firestoreConnect } from "react-redux-firebase";

class RecipeDashboard extends Component {
  state = { moreRecipes: false, loadingInitial: true, loadedRecipes: [] }; //for the first load

  handleDeleteRecipe = id => {
    this.props.deleteRecipe(id);
  };

  async componentDidMount() {
    let next = await this.props.getRecipesForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({ moreRecipes: true, loadingInitial: false });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.recipes !== prevProps.recipes) {
      this.setState({
        loadedRecipes: [...this.state.loadedRecipes, ...this.props.recipes]
      });
    }
  };

  getNextRecipes = async () => {
    const { recipes } = this.props;
    let lastRecipe = recipes && recipes[recipes.length - 1];

    let next = await this.props.getRecipesForDashboard(lastRecipe);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({ moreRecipes: false });
    }
  };

  render() {
    const { recipes, loading } = this.props;
    const { moreRecipes, loadedRecipes } = this.state;

    if (this.state.loadingInitial && recipes.length === 0) return <Loading />;

    return (
      <Container>
        <RecipesList
          loading={loading}
          recipes={loadedRecipes}
          getNextRecipes={this.getNextRecipes}
          deleteRecipe={this.handleDeleteRecipe}
          moreRecipes={moreRecipes}
        />

        <Loader active={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  loading: state.async.loading
});

const actions = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesForDashboard
};

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect()(RecipeDashboard));
