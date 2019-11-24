import React from "react";
import { Segment, Item, Grid, Header } from "semantic-ui-react";
import Moment from "react-moment";

const UserDetailsHeader = ({ profile }) => {
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={profile.photo ? profile.photo.photoURL : "/assets/user.png"}
            />

            <Item.Content verticalAlign="bottom">
              <Header as="h1" style={{ marginBottom: "0.7em" }}>
                {profile.displayName}
              </Header>

              <br />
              <Header as="h4" color="grey" style={{ marginBottom: "0.7em" }}>
                {profile.dateOfBirth ? (
                  <Moment fromNow ago>
                    {profile.dateOfBirth.toDate()}
                  </Moment>
                ) : (
                  ""
                )}
              </Header>
              <br />

              <p style={{ color: "grey" }}>
                Member since:{" "}
                {profile.createdAt ? (
                  <Moment format="DD-MM-YYYY">
                    {profile.createdAt.toDate()}
                  </Moment>
                ) : (
                  ""
                )}
              </p>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailsHeader;
