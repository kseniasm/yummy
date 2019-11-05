import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

class NavBar extends Component {
  state = {
    authenticated: true
  };

  handleSignIn = () => this.setState({ authenticated: true });
  handleSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push('/');
  }

  render() {
    const { authenticated } = this.state;

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/"  header>
            <img src="/assets/icon.png" alt="logo" />
            YUMMY
          </Menu.Item>
          {/* <Menu.Item name="Recipes" as={NavLink} to='/recipes' /> */}
          <Menu.Item name="People" as={NavLink} to="/people" />
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

          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
