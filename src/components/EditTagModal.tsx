import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { MonthlyListProps } from "./monthlyList";
import CreatableReactSelect from "react-select/creatable";
import { Dispatch, SetStateAction } from "react";
import { Tag } from "../App";

interface EditTagModalProps extends Omit<MonthlyListProps, "notes"> {
  show: boolean;
  handleClose: () => void;
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
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
        <CreatableReactSelect
          isMulti
          options={availableTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          onCreateOption={(label) => {
            const newTag = { id: label, label };

            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
          value={selectedTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          onChange={(selectedTags) => {
            setSelectedTags(
              selectedTags.map((tag) => ({
                label: tag.label,
                id: tag.value,
              }))
            );
          }}
        />
      </Modal.Body>
    </Modal>
  );
}

export default EditTagModal;
