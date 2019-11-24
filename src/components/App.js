import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import NavBar from "./navbar/NavBar";
import RecipeForm from "./recipes/recipeForm/RecipeForm";
import RecipeDetails from "./recipes/recipeDetails/RecipeDetails";
import UserDetails from "./users/UserDetails";
import Settings from "./settings/Settings";
import RecipesDashboard from "./recipes/RecipesDashboard";
import ModalManager from "../modals/ModalManager";
import { UserIsAuthenticated } from "./auth/AuthWrapper";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <NavBar />
        <Container className="main">
          <Switch key={this.props.location.key}>
            {" "}
            >
            <Route exact path="/" component={RecipesDashboard} />
            <Route exact path="/recipes" component={RecipesDashboard} />
            <Route
              path={["/recipes/new", "/recipes/edit/:id"]}
              component={UserIsAuthenticated(RecipeForm)}
            />
            <Route exact path="/recipes/:id" component={RecipeDetails} />
            <Route
              path="/profile/:id"
              component={UserIsAuthenticated(UserDetails)}
            />
            <Route path="/settings" component={UserIsAuthenticated(Settings)} />
            {/* to pass parameters to route:  <Route path="/settings" render={() => <AccpuntPage updatePassword={updatePassword}/> } />*/}
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(App); //to get acces to props in the key attribute of Switch
