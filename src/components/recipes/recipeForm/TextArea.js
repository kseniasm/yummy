import React from "react";
import { Label, Form } from "semantic-ui-react";

const TextArea = ({
  input,
  rows,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  let txt = input.value;

  if (txt && Array.isArray(txt)) txt = txt.join("\n");

  return (
    <Form.Field error={touched && !!error}>
      <textarea
        {...input}
        placeholder={placeholder}
        type={type}
        rows={rows}
        value={txt}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextArea;
