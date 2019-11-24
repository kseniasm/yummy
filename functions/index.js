const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.updateRating = functions.firestore
  .document("recipe_rating/{ratingId}")
  .onCreate(recipe => {
    let rating = recipe.data().rating;

    let recipeId = recipe.data().recipeId;

    admin
      .firestore()
      .collection("recipes")
      .doc(recipeId)
      .get()
      .then(doc => {
        let numOfReviews = doc.data().numOfReviews
          ? doc.data().numOfReviews + 1
          : 1;
        let totalRatingCount = doc.data().totalRatingCount
          ? doc.data().totalRatingCount + rating
          : rating;
        let newRating = Math.round(totalRatingCount / numOfReviews);

        return admin
          .firestore()
          .collection("recipes")
          .doc(recipeId)
          .update({
            rating: newRating,
            numOfReviews: numOfReviews,
            totalRatingCount: totalRatingCount
          });
      })
      .catch(err => {
        return console.log("Error updating rating", err);
      });
  });
