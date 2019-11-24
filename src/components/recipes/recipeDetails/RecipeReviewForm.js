import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextArea from "../recipeForm/TextArea";
import RatingInput from "./RatingInput";
import { getRecipesForDashboard } from "../../../store/actions/recipeActions";

class RecipeReviewForm extends Component {
  
  handleReviewSubmit = values => {
    const { addRecipeReview, reset, recipeId } = this.props;

    addRecipeReview(recipeId, values);

    reset();

    getRecipesForDashboard();
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleReviewSubmit)}>
        <Field name="rating" label="" value={0} component={RatingInput} />
        <Field name="review" type="text" component={TextArea} rows={2} />
        <Button
          content="Add Review"
          labelPosition="left"
          icon="edit"
          color="green"
        />
      </Form>
    );
  }
}

export default reduxForm({ form: "recipeReview" })(RecipeReviewForm);
