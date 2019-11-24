import React from "react";
import { Form, Rating } from "semantic-ui-react";

const RatingInput = ({ input, width, type, label, value }) => {
    
  return (
    <Form.Field>
      <label>{label}</label>
      <Rating
        value={value}
        icon="star"
        maxRating={5}
        {...input}
        onRate={(event, data) => input.onChange(data.rating)}
      />
    </Form.Field>
  );
};

export default RatingInput;
