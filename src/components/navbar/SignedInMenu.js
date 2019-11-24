import React, { } from "react";
import { Menu } from "semantic-ui-react";
import { Dropdown, Image, } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignedInMenu = ({ signOut, profile, auth }) => {
  return (
   
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={profile.photo ? profile.photo.photoURL : "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={profile.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${auth.uid}`}
                  text="My Profile"
                  icon="user"
                />
                {/* <Dropdown.Item as={Link} to='recipes/new' text="New Recipe" icon="plus" />
               <Dropdown.Item text="My Recipes" icon="sticky note" /> */}
  
                <Dropdown.Item
                  as={Link}
                  to="/settings"
                  text="Settings"
                  icon="settings"
                />
                <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
   
  );
  
}

export default SignedInMenu;
