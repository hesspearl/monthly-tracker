import { useState, useMemo } from "react";
import PageTitle from "../pageTitle";
import {
  Row,
  Form,
  Col,
  Modal,
  Container,
  InputGroup,
  Button,
  Image,
} from "react-bootstrap";
//import NotesInputs from "./NotesInputs";

import MonthlyCard, { MonthlyCardProps } from "../monthlyCard";
import FormInput from "../formInput";
import CreatePurchase, { CreatePurchaseProps } from "../createPurchase";
import styles from "./monthlyList.module.css";
import { getDate } from "../../utils/days";
import check from "../../assets/check.svg";
import EditTagModal from "../monthpurchase/header/EditTagModal";

export type MonthlyListProps = {
  notes: MonthlyCardProps[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
} & CreatePurchaseProps;

function MonthlyList({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
  selectedTags,
  setSelectedTags,
  onAddTag,
  onSubmit,
}: MonthlyListProps) {
  const [text, setText] = useState<string>("");
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);
  const { currentMonth } = getDate;

  const filteredNotes = useMemo(
    () =>
      notes?.filter(
        (note) =>
          !text.length ||
          note.title.toLowerCase().includes(text.toLocaleLowerCase()) ||
          note.tags?.some((noteTag) =>
            noteTag?.label
              .toLocaleLowerCase()
              .includes(text.toLocaleLowerCase())
          )
      ),
    [text, notes]
  );

  return (
    <Container className="mt-4">
      <PageTitle
        title={`Mϒ  Γist  ,${currentMonth}`}
        withButtons
        button1="Create"
        onButtonClick={() => setEditModalIsOpen(true)}
        button2="Tags"
        onButton2Click={() => setEditTagsModalIsOpen(true)}
      />
      <FormInput
        label="Search"
        value={text}
        inputMaxWidth={"50%"}
        onChange={(e) => setText(e.target.value)}
      />
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4 my-2">
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <MonthlyCard {...note} />
          </Col>
        ))}
      </Row>
      <Modal
        show={editModalIsOpen}
        onHide={() => setEditModalIsOpen(false)}
        scrollable
        dialogClassName={styles.dialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Track Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePurchase
            {...{
              selectedTags,
              setSelectedTags,
              availableTags,
              onSubmit,
              onAddTag,
            }}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={editTagsModalIsOpen}
        onHide={() => setEditTagsModalIsOpen(false)}
        scrollable
        dialogClassName={styles.dialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableTags.map((tag, index) => (
            <InputGroup key={tag.id} className="my-2">
              <Form.Control autoFocus={index === 0} value={tag.label} />
              <Button variant="success" onClick={() => onDeleteTag(tag.id)}>
                <Image src={check} style={{ width: 16, height: 16 }} />
              </Button>
              <Button
                variant="danger"
                onClick={() => onDeleteTag(tag.id)}
                style={{ fontWeight: "bold" }}
              >
                &Chi;
              </Button>
            </InputGroup>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default MonthlyList;
