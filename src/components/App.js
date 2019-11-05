import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import NavBar from "./navbar/NavBar";
import RecipeForm from "./recipes/RecipeForm";
import RecipeDetails from "./recipes/recipeDetails/RecipeDetails";
import UserDetails from "./users/UserDetails";
import Settings from "./settings/Settings";
import RecipesDashboard from "./recipes/RecipesDashboard";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          {/* <Switch key={this.props.location.key}> */}
          <Switch key={this.props.location.key}> >
            <Route exact path="/" component={RecipesDashboard} />
            <Route exact path="/recipes" component={RecipesDashboard} />
            <Route
              path={["/recipes/new", "/recipes/edit/:id"]}
              component={RecipeForm}
            />
            <Route exact path="/recipes/:id" component={RecipeDetails} />
            
            <Route path="/profile/:id" component={UserDetails} />
            <Route path="/settings" component={Settings} />
            {/* <Route path="/people" component={PeopleDashboard} /> */}
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(App); //to get acces to props in the key attribute of Switch