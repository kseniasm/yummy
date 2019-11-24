import React from "react";
import { Segment, Icon, Header, Grid } from "semantic-ui-react";
import { numOfServingsOptions } from "../../helper";

const RecipeDetailsInfo = ({ recipe }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1} text-align="center">
            <Icon name="clock outline" size="large" color="orange" />
          </Grid.Column>
          <Grid.Column width={5}>
            <span>{recipe.prepTime ? `${recipe.prepTime} min` : ""} </span>
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon name="users" size="large" color="orange" />
          </Grid.Column>
          <Grid.Column width={5}>
            <span>
              {recipe.numOfServings
                ? numOfServingsOptions[recipe.numOfServings].text
                : ""}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Header
          size="medium"
          content="Ingredients"
          style={{ color: "black" }}
        />
        <Grid verticalAlign="middle">
          {recipe.ingredients &&
            Object.values(recipe.ingredients).map((item, i) => {
              return (
                <Grid.Row key={i}>
                  <Grid.Column width={1} textAlign="center">
                    <Icon name="circle" size="mini" color="orange" />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <span>{item}</span>
                  </Grid.Column>
                </Grid.Row>
              );
            })}
        </Grid>
      </Segment>

      <Segment attached>
        <Header size="medium" content="Directions" style={{ color: "black" }} />
        <Grid verticalAlign="middle">
          {recipe.directions &&
            Object.values(recipe.directions).map((item, i) => {
              return (
                <Grid.Row key={i}>
                  <Grid.Column width={1} textAlign="center">
                    <span style={{ color: "orange" }}>{i + 1}</span>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <span>{item}</span>
                  </Grid.Column>
                </Grid.Row>
              );
            })}
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default RecipeDetailsInfo;
