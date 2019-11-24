import React from "react";
import { Button, Icon } from "semantic-ui-react";

function SocialLogin({ socialLogin }) {
  return (
    <div>
      <Button
        onClick={() => socialLogin("google")}
        type="button"
        style={{ marginBottom: "10px" }}
        fluid
        color="google plus"
      >
        <Icon name="google plus" /> Login with Google
      </Button>
    </div>
  );
}

export default SocialLogin;
