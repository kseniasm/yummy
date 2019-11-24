import React, { Component, Fragment } from "react";
import { Card, Responsive } from "semantic-ui-react";
import RecipesListItem from "./RecipesListItem";
import InfiniteScroll from "react-infinite-scroller";

class RecipesList extends Component {
  render() {
    const {
      recipes,
      deleteRecipe,
      getNextRecipes,
      loading,
      moreRecipes
    } = this.props;

    return (
      <Fragment>
        {recipes && recipes.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextRecipes}
            hasMore={!loading && moreRecipes}
            initialLoad={false}
          >
            <Responsive {...Responsive.onlyMobile}>
              <Card.Group itemsPerRow={1}>
                {recipes &&
                  recipes.map(recipe => {
                    return (
                      <RecipesListItem
                        key={recipe.id}
                        recipe={recipe}
                        deleteRecipe={deleteRecipe}
                      />
                    );
                  })}
              </Card.Group>
            </Responsive>

            <Responsive {...Responsive.onlyTablet}>
              <Card.Group itemsPerRow={2}>
                {recipes &&
                  recipes.map(recipe => {
                    return (
                      <RecipesListItem
                        key={recipe.id}
                        recipe={recipe}
                        deleteRecipe={deleteRecipe}
                      />
                    );
                  })}
              </Card.Group>
            </Responsive>

            <Responsive minWidth={993}>
              <Card.Group itemsPerRow={3}>
                {recipes &&
                  recipes.map(recipe => {
                    return (
                      <RecipesListItem
                        key={recipe.id}
                        recipe={recipe}
                        deleteRecipe={deleteRecipe}
                      />
                    );
                  })}
              </Card.Group>
            </Responsive>
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}

export default RecipesList;
