import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { MonthlyListProps } from "./monthlyList";
import SelectTags, { SelectTagProps } from "./selectTags";
import { Tag } from "../App";

interface EditTagModalProps
  extends Omit<MonthlyListProps, "notes">,
    SelectTagProps {
  show: boolean;
  handleClose: () => void;
  expendTags: Tag[];
  onUpdate: () => void;
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
  expendTags,
  onUpdate,
}: EditTagModalProps) {
  console.log({ selectedTags });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-4">
          <Stack gap={2}>
            {expendTags.map((tag) => (
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
          {...{
            selectedTags,
            setSelectedTags,
            onAddTag,
            availableTags: availableTags.filter((tag) =>
              expendTags.every((exTag) => tag.id !== exTag.id)
            ),
          }}
        />
        <Stack className="mt-4">
          <Button
            onClick={() => {
              onUpdate(), handleClose(), setSelectedTags([]);
            }}
          >
            save
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default EditTagModal;
