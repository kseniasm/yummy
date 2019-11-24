import { FETCH_RECIPES } from "./types";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
import { toastr } from "react-redux-toastr";
import firebase from "../../config/firebase";

const creteNewRecipe = (user, userPhotoURL, recipe, file) => {
  return {
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    directions: recipe.directions,
    prepTime: recipe.prepTime || 0,
    numOfServings: recipe.numOfServings || 0,
    photo: { fileName: "", photoURL: "/assets/dish.png" },
    postedBy: {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: userPhotoURL || "/assets/user.png"
    },
    createdAt: new Date()
  };
};

export const createRecipe = recipe => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser; //auth profile, without photo
    const userPhotoURL = getState().firebase.profile.photo
      ? getState().firebase.profile.photo.photoURL
      : "/assets/user.png";
    const file = recipe.image;
    const newRecipe = creteNewRecipe(user, userPhotoURL, recipe);

    try {
      dispatch(asyncActionStart());
      let createdRecipe = await firestore.collection("recipes").add(newRecipe);

      const path = `${createdRecipe.id}/recipe_images`;
      const options = {
        name: file.name
      };

      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      await firebase
        .firestore()
        .collection("recipes")
        .doc(createdRecipe.id)
        .update({
          "photo.fileName": `${file.name}`,
          "photo.photoURL": `${downloadURL}`
        });

      await firebase
        .firestore()
        .collection(`recipe_user`)
        .doc(`${createdRecipe.id}_${user.uid}`)
        .set({
          recipeId: createdRecipe.id,
          userId: user.uid,
          owner: true,
          saved: false
        });

      dispatch(asyncActionFinish());
      toastr.success("Success!", "A new recipe has been added");
      return createdRecipe;
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
      dispatch(asyncActionError());
    }
  };
};

export const updateRecipe = recipe => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    // const file = recipe.image;
    const { image, ...updatedRecipe } = recipe;
    const file = image;
    try {
      await firebase
        .firestore()
        .collection("recipes")
        .doc(recipe.id)
        .update(updatedRecipe);

      if (file) {
        const path = `${recipe.id}/recipe_images`;

        const options = {
          name: file.name
        };

        let uploadedFile = await firebase.uploadFile(path, file, null, options);
        let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

        await firebase
          .firestore()
          .collection("recipes")
          .doc(recipe.id)
          .update({
            "photo.fileName": `${file.name}`,
            "photo.photoURL": `${downloadURL}`
          });
      }

      toastr.success("Success!", "Recipe has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const deleteRecipe = recipeId => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  let recipeUserDocRef = firebase
    .firestore()
    .collection("recipes")
    .doc(recipeId);

 
  try {
    dispatch(asyncActionStart());
    const batch = firebase.firestore().batch();
    batch.delete(recipeUserDocRef);

    let recipeQuerySnap = await firebase
      .firestore()
      .collection("recipe_user")
      .where("recipeId", "==", recipeId)
      .get();

    recipeQuerySnap.forEach(doc => batch.delete(doc.ref));

    await batch.commit();

    toastr.success("Success!", "Thr recipe has been deleted");
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
    dispatch(asyncActionError());
  }
};

export const loadRecipes = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());

      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError);
    }
  };
};

export const getRecipesForDashboard = lastRecipe => async (
  dispatch,
  getState
) => {
  const firestore = firebase.firestore();
  const recipesRef = firestore.collection("recipes");

  try {
    dispatch(asyncActionStart());

    let startAfter =
      lastRecipe &&
      (await firestore
        .collection("recipes")
        .doc(lastRecipe.id)
        .get());

    let query;

    lastRecipe
      ? (query = recipesRef
          .orderBy("createdAt")
          .startAfter(startAfter)
          .limit(6))
      : (query = recipesRef.orderBy("createdAt").limit(6));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      //maybe no docs at all

      dispatch(asyncActionFinish());
      return querySnap;
    }

    let recipes = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let recipe = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      recipes.push(recipe);
    }

    dispatch({ type: FETCH_RECIPES, payload: { recipes } });

    dispatch(asyncActionFinish());

    return querySnap; //to the component
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addRecipeReview = (recipeId, values) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;

  let newReview = {
    displayName: profile.displayName,
    photoURL: profile.photo ? profile.photo.photoURL : "/assets/user.png",
    uid: user.uid,
    rating: values.rating || 0,
    text: values.review || "",
    date: Date.now()
  };

  try {
    await firebase.push(`recipe_review/${recipeId}`, newReview);

    let newRating = {
      uid: user.uid,
      rating: values.rating || 0,
      recipeId: recipeId,
      date: Date.now()
    };

    await firebase
      .firestore()
      .collection("recipe_rating")
      .add(newRating);
  } catch (error) {
    console.log(error);
  }
};
