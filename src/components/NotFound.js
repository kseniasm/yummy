import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";

const NotFound = ({ history }) => {
  return (
    <Segment placeholder>
      <Header icon color="grey">
        <Icon name="search" />
        Oops - We couldn't find this page
      </Header>
      <Segment.Inline>
        <Button onClick={() => history.push("/recipes")} color="orange">
          Return to recipes page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
