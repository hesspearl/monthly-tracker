import { useState, useMemo } from "react";
import PageTitle from "../pageTitle";
import { Row, Form, Col, Modal } from "react-bootstrap";
//import NotesInputs from "./NotesInputs";

import MonthlyCard, { MonthlyCardProps } from "../monthlyCard";
import FormInput from "../formInput";
import CreatePurchase, { CreatePurchaseProps } from "../createPurchase";
import styles from "./monthlyList.module.css";
import { Months, month } from "../../utils/days";

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

  const filteredNotes = useMemo(
    () =>
      notes?.filter(
        (note) =>
          !text.length ||
          note.title.toLowerCase().includes(text.toLocaleLowerCase()) ||
          note.tags.some((noteTag) =>
            noteTag?.label
              .toLocaleLowerCase()
              .includes(text.toLocaleLowerCase())
          )
      ),
    [text, notes]
  );

  return (
    <>
      <PageTitle
        title={`Mϒ  Γist  ,${Months[month]}`}
        withButtons
        button1="Create"
        onButtonClick={() => setEditModalIsOpen(true)}
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
      {/* <EditTagModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        {...{ availableTags, onDeleteTag, onUpdateTag }}
      /> */}
    </>
  );
}

export default MonthlyList;
