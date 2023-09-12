import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
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
import DailyRow, { left } from "./dailyRow";
import edit from "../../assets/setting.svg";
import EditTagModal from "../EditTagModal";
import { Dispatch, SetStateAction, useMemo, useState, useRef } from "react";
import { Note, NoteData, Purchase, Tag } from "../../App";
import { Day, Months, getDate } from "../../utils/days";
import calender from "../../assets/calendar-alt.svg";
import { BigButton, SmallButton } from "../button";
import { v4 as uuidV4 } from "uuid";
import cart from "../../assets/cart-plus.svg";
import BottomSheetContent, { ExpendsProps } from "./bottomSheetContent";
import { useSpring, animated } from "@react-spring/web";

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
  const { currentMonth } = getDate(new Date());

  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(() => note.title);
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [openMonthPurchase, setOpenMonthPurchases] = useState<{
    id: string;
    open: boolean;
  }>({
    id: "",
    open: false,
  });

  const editTitleHandler = () => {
    if (!editTitle) {
      setEditTitle(true);
      return;
    }

    onUpdate(note.id, { ...note, title });
    setEditTitle(false);
  };
  const bottomSheetHandler = (height: string, close?: boolean) => {
    const bottomSheetElement = window.document.getElementById("bottomSheet");

    if (bottomSheetElement) {
      if (bottomSheetElement.style.height > height && height === "20%") return;
      if (close) {
        bottomSheetElement.style.height = height;
        bottomSheetElement.style.display = `none`;
        return;
      }
      bottomSheetElement.style.height = height;
      bottomSheetElement.style.display = `flex`;
    }
  };

  const onCreateExpend = (data: ExpendsProps) => {
    const updatedPurchases = note.purchases.map((purchase) => {
      if (data.monthId === purchase.id) {
        const amount = data.amount as number;
        if (purchase.remain < amount) return purchase;
        const updateMonthPurchase: Purchase = {
          ...purchase,
          remain: purchase.remain - amount,
          expends: [
            ...purchase.expends,
            {
              id: uuidV4(),
              date: data.date,
              day: data.day,
              amount,
            },
          ],
        };
        return updateMonthPurchase;
      } else return purchase;
    });
    onUpdate(note.id, { ...note, purchases: updatedPurchases });
  };

  const onOpenMonthClicked = (id: string) => {
    if (id === openMonthPurchase.id) {
      setOpenMonthPurchases({ id: "", open: false });
      return;
    }
    setOpenMonthPurchases({ id: id, open: true });
  };
  return (
    <Stack
      className={`d-flex justify-content-between  position-relative ${style.page} `}
      // onClick={() => api.set({ x: 0 })}
    >
      <Row className="align-items-center px-4 mb-4" style={{}}>
        <Col>
          <Stack gap={1} direction="horizontal" className=" flex-wrap ">
            <h1>Expends Target :</h1>
            {!editTitle ? (
              <h1>{note.title}</h1>
            ) : (
              <Form>
                <Form.Control
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className={"ms-5"}
                  //style={{ maxWidth: inputMaxWidth }}
                  //  placeholder={placeholder}
                />
              </Form>
            )}
            <Image src={edit} role="button" onClick={editTitleHandler} />
          </Stack>

          <Stack gap={1} direction="horizontal" className=" flex-wrap ">
            <h1>Tags :</h1>
            {note?.tags?.length > 0 &&
              note.tags.map((tag) => (
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
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/`}>
              <Button>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div className="d-flex justify-content-center  ">
        <Stack className={`  p-3 ${style.container}`}>
          <Stack gap={3} style={{ overflowY: "scroll", overflowX: "hidden" }}>
            {note.purchases.map((purchase) => {
              return (
                <>
                  <MonthlyRow
                    onMonthClick={() => onOpenMonthClicked(purchase.id)}
                    key={purchase.id}
                    current={purchase.month === currentMonth}
                    {...purchase}
                  />
                  {openMonthPurchase.id === purchase.id &&
                    openMonthPurchase.open && (
                      <DailyRow
                        {...{
                          expends: purchase.expends,
                        }}
                      />
                    )}
                </>
              );
            })}
          </Stack>

          <BottomSheetContent
            {...{ bottomSheetHandler, onCreateExpend, onOpenMonthClicked }}
          />
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
        className="position-fixed bottom-0 end-0 m-4 align-items-center"
      >
        <>
          <SmallButton
            variant="black"
            image={calender}
            smallButtonStyle={
              openToggle ? style.transition2 : style.smallButtonStyle2
            }
          />
          <SmallButton
            variant="red"
            image={cart}
            onClick={() => {
              bottomSheetHandler("25%"),
                setOpenMonthPurchases({ id: "", open: false });
            }}
            smallButtonStyle={
              openToggle ? style.transition1 : style.smallButtonStyle
            }
          />
        </>

        <BigButton
          onClick={() => {
            setOpenToggle((toggle) => !toggle);
          }}
          // bigButtonStyle={style.bigButtonStyle}
        >
          <h1>{openToggle ? "×" : "+"}</h1>
        </BigButton>
      </ButtonGroup>
    </Stack>
  );
}

export default MonthlyPurchase;
