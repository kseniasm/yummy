import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Image, Grid } from "semantic-ui-react";
import { createRecipe, updateRecipe } from "../../store/actions/recipeActions";

class RecipeForm extends Component {
  state = { ...this.props.recipe };

  componentDidMount() {
    if (this.props.selectedRecipe !== null) {
      this.setState({ ...this.props.selectedRecipe });
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.id) {
      this.props.updateRecipe(this.state);
      this.props.history.push(`/recipes/${this.state.id}`);
    } else {
      const newRecipe = {
          ...this.state,
          id :'500',
          hostPhotoURL: '/assets/user.png',
          dishPhotoURL:  '/assets/dish.png'
      }

      this.props.createRecipe(newRecipe);
      this.props.history.push(`/recipes`);
    }
  };

  render() {
    const {
      title,
      description,
      numOfServings,
      ingredients,
      prepTime,
      directions,
      recipeBy,
      dishPhotoURL
    } = this.state;

    return (
      <Grid>
        <Grid.Column width={12}>
          <Segment>
            <Form autoComplete="off" onSubmit={this.handleFormSubmit}>
              <Image src={dishPhotoURL} fluid />

              <Form.Field>
                <label>Recipe Title</label>
                <input
                  name="title"
                  placeholder="Recipe Title"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </Form.Field>

              <Form.TextArea
                name="description"
                onChange={this.handleInputChange}
                rows={2}
                label="Description"
                placeholder="Description"
                value={description}
              />

              <Form.Group widths="equal">
                <Form.Input
                  name="prepTime"
                  fluid
                  label="Preparation Time (min)"
                  placeholder="In minutes"
                  onChange={this.handleInputChange}
                  value={prepTime}
                />
                <Form.Input
                  fluid
                  name="numOfServings"
                  onChange={this.handleInputChange}
                  label="Number of servings"
                  placeholder=""
                  valie={numOfServings}
                />
              </Form.Group>

              <Form.TextArea
                name="ingredients"
                onChange={this.handleInputChange}
                rows={5}
                label="Ingredients"
                placeholder="Please each ingredient on its own line"
                value={ingredients}
              />

              <Form.TextArea
                name="directions"
                onChange={this.handleInputChange}
                rows={5}
                label="Directions"
                placeholder="Put each step on its own line"
                value={directions}
              />

              <Form.Field>
                <label>Recipe By</label>
                <input
                  name="recipeBy"
                  placeholder="Recipe By"
                  value={recipeBy}
                  onChange={this.handleInputChange}
                />
              </Form.Field>

              <Button positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

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
  };

  if (recipeId && state.recipes.length > 0) {
    recipe = state.recipes.filter(recipe => recipe.id === recipeId)[0];
  }

  return {
    recipe
  };
};

const actions = {
  createRecipe,
  updateRecipe
};
export default connect(
  mapStateToProps,
  actions
)(RecipeForm);
