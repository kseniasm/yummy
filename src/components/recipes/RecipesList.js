import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import RecipesListItem from "./RecipesListItem";

class RecipesList extends Component {
  render() {
    const { recipes, deleteRecipe } = this.props;

    return (
      <Grid stretched mobile={1} tablet={2} computer={3} centered={true}>
        {recipes.map(recipe => (
          <Grid.Column key={recipe.id} mobile={15} tablet={6} computer={5}>
            <RecipesListItem recipe={recipe} deleteRecipe={deleteRecipe} />
          </Grid.Column>
        ))}
      </Grid>
      //   <Fragment>

      //     <RecipeListItem />
      //     <RecipeListItem />
      //     <RecipeListItem />
      //   </Fragment>
    );
  }
}

export default RecipesList;
