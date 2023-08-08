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
import { Note, Tag } from "../../App";
import { Months } from "../../utils/days";

interface MonthlyPurchaseProps {
  onDelete: (id: string) => void;
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  notes: Note[];
}

function MonthlyPurchase({
  onDelete,
  selectedTags,
  setSelectedTags,
  onAddTag,
  availableTags,
  notes,
}: MonthlyPurchaseProps) {
  const note = useNote();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const theDay = date.getDay();
  const year = date.getFullYear();
  const navigate = useNavigate();
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);

  return (
    <>
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
      <div className="d-flex justify-content-center mb-4">
        <Stack gap={3} className={`  p-3 ${style.container}`}>
          {/* <MonthlyRow />
          <DailyRow /> */}
          <MonthlyRow current month={Months[month]} year={year} />
        </Stack>
      </div>
      <EditTagModal
        {...{ selectedTags, setSelectedTags, onAddTag }}
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
    </>
  );
}

export default MonthlyPurchase;
