import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailsSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? (
          <Button
            as={Link}
            to="/settings"
            color="green"
            fluid
            content="Edit Profile"
          />
        ) : (
          <Button color="orange" fluid basic content="Follow user" />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailsSidebar;
