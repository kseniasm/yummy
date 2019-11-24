import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import TextInput from "../recipes/recipeForm/TextInput";
import { login, socialLogin } from "../../store/actions/authActions";
import SocialLogin from "./SocialLogin";

const LoginForm = ({ login, handleSubmit, error, socialLogin, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && (
          <Label basic color="red" style={{marginBottom: "1em"}}>
            {error}
          </Label>
        )}

        <Button loading={submitting} fluid size="large" color="green">
          Login
        </Button>

        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

const actions = {
  login,
  socialLogin
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
