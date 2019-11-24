import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import Basics from "./Basics";
import PasswordChange from "./PasswordChange";
import { updatePassword } from "../../store/actions/authActions";
import { updateProfile } from "../../store/actions/userActions";
import ImageUpload from "./ImageUpload";

const Settings = ({ updatePassword, providerId, user, updateProfile }) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ImageUpload />
        <Basics initialValues={user} updateProfile={updateProfile} />
        <PasswordChange
          updatePassword={updatePassword}
          providerId={providerId}
        />
      </Grid.Column>
      <Grid.Column width={4}></Grid.Column>
    </Grid>
  );
};

const actions = {
  updatePassword,
  updateProfile
};

const mapStateToProps = state => ({
  providerId:
    state.firebase.auth.isLoaded &&
    state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile // applicaiton doesn't render till we know the status of authentication
});

export default connect(mapStateToProps, actions)(Settings);
