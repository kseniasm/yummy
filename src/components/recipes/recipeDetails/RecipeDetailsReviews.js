import React, { Component, Fragment } from "react";
import { Segment, Comment, Header, Rating } from "semantic-ui-react";
import RecipeReviewForm from "./RecipeReviewForm";
import Moment from "react-moment";

import { Link } from "react-router-dom";

class RecipeDetailsReviews extends Component {
  render() {
    const {
      addRecipeReview,
      recipeId,
      recipeReviews,
      isOwner,
      authenticated
    } = this.props;

    return (
      <Fragment>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="orange"
          style={{ border: "none" }}
        >
          <Header>Reviews</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {recipeReviews &&
              recipeReviews.map(review => (
                <Comment key={review.id}>
                  <Comment.Avatar src={review.photoURL || "/assets/user.png"} />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${review.uid}`}>
                      {review.displayName}
                    </Comment.Author>

                    <Comment.Metadata>
                      <Moment fromNow>{new Date(review.date)}</Moment>
                    </Comment.Metadata>

                    <div>
                      <Rating
                        style={{ marginTop: "0.5em" }}
                        disabled
                        icon="star"
                        defaultRating={review.rating}
                        maxRating={5}
                        size="mini"
                      />
                    </div>
                    <Comment.Text>{review.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>

          {authenticated && !isOwner && (
            <RecipeReviewForm
              addRecipeReview={addRecipeReview}
              recipeId={recipeId}
            />
          )}
        </Segment>
      </Fragment>
    );
  }
}

export default RecipeDetailsReviews;
