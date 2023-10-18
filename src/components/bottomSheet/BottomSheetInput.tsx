import { Form, FormControlProps } from "react-bootstrap";

function BottomSheetInput({
  title,
  required,
  min,
  ...formControlProps
}: { title: string; required?: boolean; min?: number } & FormControlProps) {
  return (
    <Form.Group
      controlId="title"
      className="d-flex flex-column align-items-center mt-3 fs-4"
    >
      <Form.Label>{title} </Form.Label>
      <Form.Control
        required={required}
        min={min}
        {...formControlProps}
        style={{
          width: 373,
          height: 44,
          padding: 0,
          textAlign: "center",
        }}
        //  placeholder={placeholder}
      />
    </Form.Group>
  );
}

export default BottomSheetInput;
