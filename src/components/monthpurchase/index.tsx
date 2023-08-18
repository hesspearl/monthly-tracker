import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Image,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
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
import { getDate } from "../../utils/days";
import cart from "../../assets/cart-plus.svg";
import calender from "../../assets/calendar-alt.svg";
import { BigButton, SmallButton } from "../button";
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
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const { currentMonth } = getDate(new Date());

  console.log({ selectedTags });
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
          {note.purchases.map((purchase) => {
            return (
              <>
                <MonthlyRow
                  key={purchase.id}
                  current={purchase.month === currentMonth}
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
        onUpdateExpendTags={() =>
          onUpdate(note.id, { ...note, tags: [...note.tags, ...selectedTags] })
        }
        onUpdateExpendTagsOrder={(orderedTags: Tag[]) => {
          onUpdate(note.id, { ...note, tags: orderedTags });
        }}
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
      <ButtonGroup
        vertical
        className="position-absolute bottom-0 end-0 m-4 align-items-center"
      >
        <>
          <SmallButton
            variant="secondary"
            image={calender}
            smallButtonStyle={
              openToggle ? style.transition2 : style.smallButtonStyle2
            }
          />
          <SmallButton
            variant="danger"
            image={cart}
            smallButtonStyle={
              openToggle ? style.transition1 : style.smallButtonStyle
            }
          />
        </>

        <BigButton
          onClick={() => {
            setOpenToggle((toggle) => !toggle);
          }}
          bigButtonStyle={style.bigButtonStyle}
        >
          <h1>{openToggle ? "×" : "+"}</h1>
        </BigButton>
      </ButtonGroup>
    </Stack>
  );
}

export default MonthlyPurchase;
