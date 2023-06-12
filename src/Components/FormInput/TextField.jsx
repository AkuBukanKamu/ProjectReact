import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useController } from "react-hook-form";

const TextField = ({
  name,
  label,
  control,
  rules,
  type = "text",
  placeholder,
  prefix,
  required = false,
  ...rest
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required, ...rules }, // Include required rule if the 'required' prop is true
    defaultValue: "",
  });

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>

      <InputGroup className="mb-3">
        {prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
        <Form.Control
          type={type}
          ref={ref}
          isInvalid={invalid}
          {...inputProps}
          {...rest}
          required
          placeholder={placeholder}
        />
      </InputGroup>
      {invalid && (
        <Form.Control.Feedback type="invalid">
          {error?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;
