import React from "react";
import { Grid} from "semantic-ui-react";
import { connect } from "react-redux";
import RecipeDetailsHeader from "./RecipeDetailsHeader";
import RecipeDetailsInfo from "./RecipeDetailsInfo";
import RecipeDetailsReviews from "./RecipeDetailsReviews";

const RecipeDetails = ({recipe}) => {
 

  return (
    <Grid>
      <Grid.Column width={12}>
        <RecipeDetailsHeader recipe={recipe} />
        <RecipeDetailsInfo recipe={recipe} />
        <RecipeDetailsReviews />
      </Grid.Column>
      <Grid.Column width={4}></Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;
  
  let recipe = {
    title: "",
    description: "",
    prepTime: "",
    numOfServings: "",
    ingredients: "",
    directions: "",
    recipeBy: "",
    dishPhotoURL: "/assets/dish.png"
  }; //avoid an error

  if (recipeId && state.recipes.length > 0) {
    recipe = state.recipes.filter(recipe => recipe.id === recipeId)[0];
    
  }

  return {
    recipe
  }
};

export default connect(mapStateToProps)(RecipeDetails);
