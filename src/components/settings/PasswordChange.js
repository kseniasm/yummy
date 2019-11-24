import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators
} from "revalidate";

import TextInput from "../recipes/recipeForm/TextInput";

const PasswordChange = ({
  error,
  invalid,
  submitting,
  updatePassword,
  handleSubmit,
  providerId
}) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === "password" && (
        <div>
          <Header color="orange" sub content="Change password" />

          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              disabled={invalid || submitting}
              size="large"
              positive
              content="Update Password"
            />
          </Form>
        </div>
      )}

      {providerId && providerId === "google.com" && (
        <div>
          <Header color="orange" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Go to Google
          </Button>
        </div>
      )}
    </Segment>
  );
};

const validate = combineValidators({
  newPassword1: isRequired({ message: "Please enter a password" }),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )()
});

export default reduxForm({ form: "account", validate })(PasswordChange);
