import React, { Component, Fragment } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { openModal } from "../../store/actions/modalActions";

class NavBar extends Component {
  handleSignIn = () => this.props.openModal("LoginModal");

  handleRegister = () => this.props.openModal("RegisterModal");

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/icon.png" alt="logo" />
            YUMMY
          </Menu.Item>
          {authenticated && (
            <Fragment>
              <Menu.Item>
                <Button
                  as={Link}
                  to="/recipes/new"
                  floated="right"
                  positive
                  inverted
                  content="New Recipe"
                />
              </Menu.Item>
            </Fragment>
          )}

          {authenticated ? (
            <SignedInMenu
              auth={auth}
              signOut={this.handleSignOut}
              profile={profile}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const actions = {
  openModal
};

export default withRouter(
  withFirebase(connect(mapStateToProps, actions)(NavBar))
);
