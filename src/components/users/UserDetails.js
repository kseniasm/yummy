import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import UserDetailsHeader from "./UserDetailsHeader";
import UserDetailsSidebar from "./UserDetailsSidebar";
import UserRecipes from "./UserRecipes";
import { isEmpty, firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Loading from "../Loading";
import { getUserRecipes } from "../../store/actions/userActions";

class UserDetails extends Component {
  async componentDidMount() {
    await this.props.getUserRecipes(this.props.userId);
  }

  changeTab = (e, data) => {
    this.props.getUserRecipes(this.props.userId, data.activeIndex);
  };

  render() {
    const {
      profile,
      auth,
      match,
      requesting,
      recipes,
      recipesLoading
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true); //if any of request in firestore is true, the loading will be true. we check it in redux listeners

    if (loading) {
      return <Loading />;
    }

    return (
      <Grid>
        <UserDetailsHeader profile={profile} />

        <UserRecipes
          profile={profile}
          recipes={recipes}
          recipesLoading={recipesLoading}
          changeTab={this.changeTab}
        />

        <UserDetailsSidebar isCurrentUser={isCurrentUser} />
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let userId = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userId = ownProps.match.params.id;
  }

  return {
    profile,
    userId,
    auth: state.firebase.auth,
    recipes: state.recipes.userRecipes,
    recipesLoading: state.async.loading,
    requesting: state.firestore.status.requesting
  };
};

const userDetailedQuery = ({ userId }) => {
  if (userId !== null) {
    return [
      {
        collection: "users",
        doc: userId,
        storeAs: "profile"
      }
    ];
  }
};

const actions = {
  getUserRecipes
};
export default connect(
  mapStateToProps,
  actions
)(firestoreConnect(userUid => userDetailedQuery(userUid))(UserDetails));
