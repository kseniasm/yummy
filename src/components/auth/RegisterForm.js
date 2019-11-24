import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import TextInput from "../../components/recipes/recipeForm/TextInput";
import { combineValidators, isRequired } from "revalidate";
import SocialLogin from "./SocialLogin";

const RegisterForm = ({
  register,
  handleSubmit,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <Form size="large" autoComplete="off" onSubmit={handleSubmit(register)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />

          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            loading={submitting}
            disabled={invalid || submitting}
            fluid
            size="large"
            color="green"
          >
            Register
          </Button>

          <Divider horizontal>Or</Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password")
});

const actions = {
  register
};
export default connect(
  null,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
