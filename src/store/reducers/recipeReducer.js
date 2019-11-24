import { createReducer } from "./reducerUtils";
import {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  FETCH_RECIPES,
  FETCH_USER_RECIPES
} from "../actions/types";

const initialState = {
  recipes: [],
  userRecipes: []
};

const createRecipe = (state, payload) => {
  return [...state, payload.recipe];
};

const updateRecipe = (state, payload) => {
  return [
    ...state.filter(recipe => recipe.id !== payload.recipe.id),
    payload.recipe
  ];
};

const deleteRecipe = (state, payload) => {
  return [...state.filter(recipe => recipe.id !== payload.recipeId)];
};

const fetchRecipes = (state, payload) => {
  return {
    ...state,
    recipes: payload.recipes
  };
};

const fetchUserRecipes = (state, payload) => {
  return {
    ...state,
    userRecipes: payload.recipes
  };
};

export default createReducer(initialState, {
  [CREATE_RECIPE]: createRecipe,
  [UPDATE_RECIPE]: updateRecipe,
  [DELETE_RECIPE]: deleteRecipe,
  [FETCH_RECIPES]: fetchRecipes,
  [FETCH_USER_RECIPES]: fetchUserRecipes
});
