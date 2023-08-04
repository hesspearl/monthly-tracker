import { useState, useMemo } from "react";
import PageTitle from "../../pageTitle";
import { Row, Form, Col } from "react-bootstrap";
//import NotesInputs from "./NotesInputs";
import { Tag } from "../../App";
import MonthlyCard, { MonthlyCardProps } from "../monthlyCard";
//import EditTagModal from "./EditTagModal";

export type MonthlyListProps = {
  availableTags: Tag[];
  notes: MonthlyCardProps[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
  selectedTags: Tag[];
};

function MonthlyList({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
  selectedTags,
}: MonthlyListProps) {
  const [text, setText] = useState<string>("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);

  const filteredNotes = useMemo(
    () =>
      notes?.filter(
        (note) =>
          (!text.length ||
            note.title.toLowerCase().includes(text.toLocaleLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag?.id === tag.id)
            ))
      ),
    [text, selectedTags, notes]
  );

  return (
    <>
      <PageTitle
        title="M&upsih; &Gamma;ist  , August"
        withButtons
        button1="Create"
        linkTo="/new"
      />
      <Form>
        <Form.Group
          controlId="title"
          className="d-flex flex-row align-items-center"
        >
          <Form.Label>Search</Form.Label>
          <Form.Control
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
            className={"mx-5"}
            style={{ maxWidth: "50%" }}
          />
        </Form.Group>
        {/* <NotesInputs
          {...{ selectedTags, setSelectedTags, availableTags, text, setText }}
        /> */}
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4 my-2">
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <MonthlyCard {...note} />
          </Col>
        ))}
      </Row>
      {/* <EditTagModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        {...{ availableTags, onDeleteTag, onUpdateTag }}
      /> */}
    </>
  );
}

export default MonthlyList;
