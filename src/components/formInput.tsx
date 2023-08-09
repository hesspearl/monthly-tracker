import React from "react";
import { Form } from "react-bootstrap";

interface FormInputProps {
  label: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  type?: string;
  placeholder?: string;
  inputMaxWidth?: number | string;
}

function FormInput({
  label,
  value,
  onChange,
  type,
  placeholder,
  inputMaxWidth,
}: FormInputProps) {
  return (
    <>
      <Form.Group
        controlId="title"
        className="d-flex flex-row align-items-center "
      >
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          required
          onChange={(e) => onChange(e)}
          value={value}
          className={"ms-5"}
          style={{ maxWidth: inputMaxWidth }}
          placeholder={placeholder}
        />
      </Form.Group>
    </>
  );
}

export default FormInput;