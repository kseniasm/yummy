import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../components/recipes/recipeForm/DateInput";
import TextInput from "../../components/recipes/recipeForm/TextInput";
import RadioInput from "../../components/recipes/recipeForm/RadioInput";

class Basics extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label>Gender:</label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />

            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>

          <Field
            width={8}
            name="dateOfBirth"
            component={DateInput}
            placeholder="Date of Birth"
            dateFormat="dd-MM-yyyy"
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
          />

          <Divider />
          <Button
            disabled={pristine || submitting}
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({ form: "userProfile", enableReinitialize: true })(
  Basics
);
