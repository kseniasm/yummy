import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
import { FETCH_USER_RECIPES } from "./types";
import firebase from "../../config/firebase";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await firebase.updateProfile(updatedUser); //updates profile in firestore
    toastr.success("Success", "Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firestore = firebase.firestore();

  const user = firebase.auth().currentUser;

  const path = `${user.uid}/user_images`;

  let recipeUserRef = firestore.collection("recipe_user");

  const options = {
    name: fileName
  };

  try {
    dispatch(asyncActionStart());
    //upload file to firebase storage
    let uploadedFile = await getFirebase().uploadFile(
      path,
      file,
      null,
      options
    );

    //get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

    //get userdoc
    await getFirebase()
      .firestore()
      .collection("users")
      .doc(user.uid);

    await getFirebase().updateProfile({
      photo: {
        fileName: fileName,
        photoURL: downloadURL
      }
    });

    await user.updateProfile({
      //to update in auth part
      photoURL: downloadURL
    });

    let recipesQuery = await recipeUserRef
      .where("userId", "==", user.uid)
      .where("owner", "==", true);

    let recipesQuerySnap = await recipesQuery.get();
    if (recipesQuerySnap.docs.length === 0) dispatch(asyncActionFinish());

    let batch = firestore.batch();
    for (let i = 0; i < recipesQuerySnap.docs.length; i++) {
      let recipeDocRef = await firestore
        .collection("recipes")
        .doc(recipesQuerySnap.docs[i].data().recipeId);
        
      batch.update(recipeDocRef, {
        'postedBy.photoURL': downloadURL
      });
    }

    await batch.commit();

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.fileName}`); //from storage

    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({ photo: "" });
  } catch (error) {
    console.log(error);
  }
};

export const saveRecipe = recipe => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;

  try {
    await firestore
      .collection(`recipe_user`)
      .doc(`${recipe.id}_${user.uid}`)
      .set({
        recipeId: recipe.id,
        userId: user.uid,
        owner: false,
        saved: true
      });
    toastr.success("Succes", "You have saved the recipe");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem saving the recipe");
  }
};

export const unsaveRecipe = recipe => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  try {
    await firestore
      .collection(`recipe_user`)
      .doc(`${recipe.id}_${user.uid}`)
      .delete();

    toastr.success("Succes", "You have unsaved the recipe");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

export const getUserRecipes = (userId, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  let recipesRef = firestore.collection("recipe_user");
  let query;

  switch (activeTab) {
    case 1: //posted recipes
      query = recipesRef
        .where("userId", "==", userId)
        .where("owner", "==", true); //orderBy('createdAt') save also with createdAt fiels
      break;
    case 2:
      query = recipesRef
        .where("userId", "==", userId)
        .where("saved", "==", true); //orderBy('createdAt') save also with createdAt fiels
      break;
    default:
      query = recipesRef.where("userId", "==", userId); //orderBy('createdAt') save also with createdAt fiels
  }

  try {
    let querySnap = await query.get();

    let recipes = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let recipe = await firestore
        .collection("recipes")
        .doc(querySnap.docs[i].data().recipeId)
        .get();
      recipes.push({ ...recipe.data(), id: recipe.id });
    }
    dispatch({ type: FETCH_USER_RECIPES, payload: { recipes } });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
