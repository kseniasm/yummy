import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import RecipesList from "./RecipesList";
import {connect} from 'react-redux';
import {createRecipe, updateRecipe, deleteRecipe} from '../../store/actions/recipeActions'


class RecipeDashboard extends Component {

 

  handleDeleteRecipe = (id) => {
    this.props.deleteRecipe(id);
   }


  render() {
    const {recipes} = this.props


    return (
      <Container>

        <RecipesList recipes={recipes}  deleteRecipe={this.handleDeleteRecipe} />
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
    recipes: state.recipes
})

const actions = {
  createRecipe, 
  updateRecipe,
  deleteRecipe 

}

export default connect(mapStateToProps, actions)(RecipeDashboard);
