import React, { Fragment } from "react";
import {
  Item,
  Rating,
  Segment,
  Image,
  Header,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const RecipeDetailsHeader = ({
  recipe,
  saveRecipe,
  unsaveRecipe,
  isOwner,
  deleteRecipe,
  saved,
  authenticated,
  openModal
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={recipe.photo ? recipe.photo.photoURL : "/assets/dish.png"}
          fluid
        />

        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={recipe.title}
                  style={{ color: "black" }}
                />

                <Rating
                  disabled
                  icon="star"
                  defaultRating={recipe.rating}
                  maxRating={5}
                  style={{ marginLeft: "1em" }}
                />

                <p style={{marginTop: "1em"}}>{recipe.description}</p>
                <p>
                  Recipe by{" "}
                  <strong>
                    <Link
                      to={`/profile/${recipe.postedBy.uid}`}
                      style={{ color: "purple", marginTop: "1em" }}
                    >
                      {recipe.postedBy ? recipe.postedBy.displayName : ""}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {authenticated ? (
          <Fragment>
            {!isOwner && saved && (
              <Button color="green" onClick={() => unsaveRecipe(recipe)}>
                Unsave
              </Button>
            )}
            {!isOwner && !saved && (
              <Button color="green" onClick={() => saveRecipe(recipe)}>
                Save
              </Button>
            )}
          </Fragment>
        ) : (
          <Button color="green" onClick={() => openModal("UnauthModal")}>
            Save
          </Button>
        )}

        {/* {!isOwner && <Button color="green">Rate</Button>} */}
        {isOwner && (
          <Button
            color="red"
            floated="right"
            onClick={() => deleteRecipe(recipe.id)}
          >
            Delete
          </Button>
        )}
        {isOwner && (
          <Button
            as={Link}
            to={`/recipes/edit/${recipe.id}`}
            color="green"
            floated="right"
          >
            {" "}
            Edit Recipe
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default RecipeDetailsHeader;
