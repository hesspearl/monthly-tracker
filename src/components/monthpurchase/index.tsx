import { Badge, Button, Col, Image, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNote } from "../../hook/useNote";
import style from "./monthPurchase.module.css";
import MonthlyRow from "./monthlyRow";
import DailyRow from "./dailyRow";
import edit from "../../assets/setting.svg";
import EditTagModal from "../EditTagModal";
import { Dispatch, SetStateAction, useState } from "react";
import { Note, NoteData, Tag } from "../../App";
import { Months, month, year } from "../../utils/days";

interface MonthlyPurchaseProps {
  onDelete: (id: string) => void;
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  notes: Note[];
  onUpdate: (id: string, data: NoteData) => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteNoteTag: (id: string, tagId: string) => void;
}

function MonthlyPurchase({
  onDelete,
  selectedTags,
  setSelectedTags,
  onAddTag,
  availableTags,
  notes,
  onUpdate,
  onUpdateTag,
  onDeleteNoteTag,
}: MonthlyPurchaseProps) {
  const note = useNote();
  const navigate = useNavigate();
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);

  return (
    <Stack
      className="d-flex justify-content-between "
      style={{ minWidth: 300 }}
    >
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Expends Target :{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className=" flex-wrap ">
              <h1>Tags :</h1>
              {note.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  bg="secondary"
                  className="text-truncate p-2 fs-6 "
                >
                  {tag.label}
                </Badge>
              ))}

              <Image
                src={edit}
                role="button"
                onClick={() => setEditTagsModalIsOpen(true)}
              />
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/`}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div className="d-flex justify-content-center  ">
        <Stack gap={3} className={`  p-3 ${style.container}`}>
          {/* <MonthlyRow />
           */}
          {note.purchases.map((purchase) => {
            return (
              <>
                <MonthlyRow
                  key={purchase.id}
                  current={purchase.month === Months[month]}
                  {...purchase}
                />
                {purchase.expends.map((expend) => (
                  <DailyRow key={expend.id} {...expend} />
                ))}
              </>
            );
          })}
        </Stack>
      </div>
      <EditTagModal
        {...{ selectedTags, setSelectedTags, onAddTag, onUpdateTag }}
        expendTags={note.tags}
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        onDeleteTag={(id) => onDeleteNoteTag(note.id, id)}
        onUpdate={() =>
          onUpdate(note.id, { ...note, tags: [...note.tags, ...selectedTags] })
        }
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
      <Button
        className="border rounded-circle position-absolute bottom-0 end-0 m-4 "
        style={{ width: 80, height: 80, backgroundColor: "#D9D9D9" }}
      >
        <h1>+</h1>
      </Button>
    </Stack>
  );
}

export default MonthlyPurchase;
