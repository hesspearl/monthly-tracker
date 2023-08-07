import { useState, useMemo } from "react";
import PageTitle from "../pageTitle";
import { Row, Form, Col } from "react-bootstrap";
//import NotesInputs from "./NotesInputs";
import { Tag } from "../../App";
import MonthlyCard, { MonthlyCardProps } from "../monthlyCard";
import FormInput from "../formInput";
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

  console.log({ selectedTags });

  const filteredNotes = useMemo(
    () =>
      notes?.filter(
        (note) =>
          (!text.length ||
            note.title.toLowerCase().includes(text.toLocaleLowerCase())) &&
          (availableTags.length !== 0 ||
            availableTags.every((tag) =>
              note.tags.some(
                (noteTag) => noteTag?.label === text.toLocaleLowerCase()
              )
            ))
      ),
    [text, availableTags, notes]
  );

  return (
    <>
      <PageTitle
        title="M&upsih; &Gamma;ist  , August"
        withButtons
        button1="Create"
        linkTo="/new"
      />
      <FormInput
        label="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
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
