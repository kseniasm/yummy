import React from "react";
import { Grid, Segment, Card, Image, Header, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";

const panes = [
  { menuItem: "All recipes", pane: { key: "allRecipes" } },
  { menuItem: "Posted recipes", pane: { key: "postedRecipes" } },
  { menuItem: "Saved recipes", pane: { key: "savedRecipes" } }
];

const UserRecipes = ({ recipes, recipesLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={recipesLoading}>
        <Header icon="sticky note" content="Recipes" />

        <Tab
          color="grey"
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          onTabChange={(e, data) => changeTab(e, data)}
          style={{ marginBottom: "1em", color: "grey" }}
        />

        <Card.Group itemsPerRow={4}>
          {recipes &&
            recipes.map(recipe => (
              <Card as={Link} to={`/recipes/${recipe.id}`} key={recipe.id}>
                <Image src={recipe.photo && recipe.photo.photoURL} />
                <Card.Content>
                  <Card.Header color="grey" as="h5" textAlign="center">
                    {recipe.title}
                  </Card.Header>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserRecipes;
