import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { MonthlyListProps } from "./monthlyList";
import SelectTags, { SelectTagProps } from "./selectTags";

interface EditTagModalProps
  extends Omit<MonthlyListProps, "notes">,
    SelectTagProps {
  show: boolean;
  handleClose: () => void;
}

function EditTagModal({
  availableTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
  setSelectedTags,
  selectedTags,
  onAddTag,
}: EditTagModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-4">
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &Chi;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
        <SelectTags
          {...{ selectedTags, setSelectedTags, onAddTag, availableTags }}
        />
      </Modal.Body>
    </Modal>
  );
}

export default EditTagModal;
