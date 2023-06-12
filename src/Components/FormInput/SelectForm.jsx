import React from "react";
import { Form } from "react-bootstrap";
import { useController } from "react-hook-form";

const SelectForm = ({
  name,
  label,
  control,
  rules,
  required = false,
  options,
  ...rest
}) => {
  const {
    field: { ref, ...selectProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        ref={ref}
        isInvalid={invalid}
        {...selectProps}
        {...rest}
        required
      >
        <option value="" hidden>
          Pilih
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {invalid && (
        <Form.Control.Feedback type="invalid">
          {error?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SelectForm;
