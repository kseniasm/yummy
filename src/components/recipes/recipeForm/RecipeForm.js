import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Segment,
  Button,
  Grid,
  Header

} from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  isNumeric
} from "revalidate";
import {
  createRecipe,
  updateRecipe
} from "../../../store/actions/recipeActions";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";
import { numOfServingsOptions } from "../../helper";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import ImageInput from "./ImageInput";
import Loading from "../../Loading";

/************************************************************************************************************ */

class RecipeForm extends Component {
  state = { file: "", imagePreviewUrl: "/assets/dish.png", newRecipe: false };

  async componentDidMount() {
    const { firestore, match, history } = this.props;

    if (!match.params.id) {
      this.setState({ newRecipe: true });
      return;
    }

    let recipe = await firestore.get(`recipes/${match.params.id}`);

    if (!recipe.exists) {
      history.push(`/recipes`); //could put a not found page
      toastr.error("Sorry", "Page not found");
    }
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`recipes/${match.params.id}`);
  }

  onFormSubmit = async values => {
    console.log(values);
    if (!Array.isArray(values.ingredients))
      values.ingredients = stringToArray(values.ingredients);
    if (!Array.isArray(values.directions))
      values.directions = stringToArray(values.directions);

    try {
      if (
        Object.entries(this.props.initialValues).length !== 0 &&
        this.props.initialValues.id
      ) {
        await this.props.updateRecipe(values);
        this.props.history.push(`/recipes/${this.props.initialValues.id}`);
      } else {
        let createdRecipe = await this.props.createRecipe(values);

        this.props.history.push(`/recipes/${createdRecipe.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;

    if (!this.state.newRecipe && Object.entries(initialValues).length === 0)
      return <Loading />;
    const buttonContent =
      (initialValues.id &&
        initialValues.photo &&
        initialValues.photo.photoURL) ||
      this.state.file
        ? "Edit Photo"
        : "Add Photo";

    return (
      <Grid>
        <Grid.Column width={12}>
          <Segment>
            <Form
              autoComplete="off"
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
              <Segment clearing>
                <Field
                  name="image"
                  type="file"
                  component={ImageInput}
                  imageURL={
                    initialValues.photo
                      ? initialValues.photo.photoURL
                      : "/assets/dish.png"
                  }
                  buttonContent={buttonContent}
                />
              </Segment>

              <Header sub color="orange" content="Recipe Description" />

              <Field
                name="title"
                component={TextInput}
                placeholder="Recipe Title"
              />
              <Field
                name="description"
                component={TextArea}
                rows={2}
                placeholder="Description"
              />

              <Header sub color="orange" content="Preparation" />
              <Field
                name="prepTime"
                component={TextInput}
                placeholder="Preparation time in minutes"
              />
              <Field
                name="numOfServings"
                component={SelectInput}
                options={numOfServingsOptions}
                placeholder="Number of servings"
              />
              <Field
                name="ingredients"
                component={TextArea}
                rows={4}
                placeholder="Ingredients. Please each ingredient on its own line"
              />
              <Field
                name="directions"
                component={TextArea}
                rows={4}
                placeholder="Directions. Put each step on its own line"
              />

              <Button
                positive
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>

              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/recipes/${initialValues.id}`)
                    : () => history.push("/recipes")
                }
                type="button"
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

/******************************************************************************************************* */

const stringToArray = str => {
  let arr = [];
  str.split("\n").forEach(item => {
    if (item && item.trim() !== "") arr.push(item.trim());
  });

  return arr;
};

const validate = combineValidators({
  title: isRequired({ message: "The recipe title is required" }),
  ingredients: composeValidators(
    isRequired({ message: "The ingredients are required" })
    // hasLengthGreaterThan(5)({
    //   message: "Please provide at least one ingredient"
    // })
  )(),
  directions: composeValidators(
    isRequired({ message: "The directions are required" })
    // hasLengthGreaterThan(5)({
    //   message: "Please provide at least one direction"
    // })
  )(),
  prepTime: isNumeric({ message: "Please enter a valid number of minutes" })
});

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
    initialValues: recipe,
    recipe
  };
};

const actions = {
  createRecipe,
  updateRecipe
};

export default withFirestore(
  connect(
    mapStateToProps,
    actions
  )(
    reduxForm({ form: "recipeForm", validate, enableReinitialize: true })(
      RecipeForm
    )
  )
);
