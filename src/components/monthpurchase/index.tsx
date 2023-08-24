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
import DailyRow from "./dailyRow";
import edit from "../../assets/setting.svg";
import EditTagModal from "../EditTagModal";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Note, NoteData, Tag } from "../../App";
import { Day, Months, getDate } from "../../utils/days";
import calender from "../../assets/calendar-alt.svg";
import { BigButton, SmallButton } from "../button";
import check from "../../assets/check.svg";
import pencil from "../../assets/pencil-alt.svg";
import cart from "../../assets/cart-plus.svg";

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
  const {
    currentMonth,
    year: selectedYear,
    month: selectedDateOfMonth,
  } = getDate(new Date());
  const navigate = useNavigate();
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(() => note.title);
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<{
    month: number;
    year: number;
  }>({
    month: selectedDateOfMonth,
    year: selectedYear,
  });

  const editTitleHandler = () => {
    if (!editTitle) {
      setEditTitle(true);
      return;
    }

    onUpdate(note.id, { ...note, title });
    setEditTitle(false);
  };

  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

  const dateList = useMemo(() => {
    return getAllDaysInMonth(selectedMonth.month, selectedMonth.year).map(
      (date) => ` ${date.getDate()} , ${Object.keys(Day)[date.getDay()]}`
    );
  }, [selectedMonth]);

  const buttonsList = [
    { image: pencil, onClick: () => {} },
    { image: check, onClick: () => {}, color: "#B6B5ED" },
    { image: cart, onClick: () => {}, color: "red" },
  ];

  return (
    <Stack
      className={`d-flex justify-content-between  position-relative ${style.page} `}
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

          <div className={style.bottomSheet}>
            <Dropdown data-bs-theme="dark" className={style.dropDown}>
              <Form.Label className="fs-4">Choose a Month</Form.Label>
              <Dropdown.Toggle
                id="month"
                className={style.toggle}
                variant="secondary"
              >
                Choose Month
              </Dropdown.Toggle>

              <Dropdown.Menu className={style.toggle}>
                {note.purchases.map((purchase) => (
                  <Dropdown.Item
                    key={purchase.id}
                    onClick={() =>
                      setSelectedMonth({
                        month: Number(Months[purchase.month as Months]),
                        year: purchase.year,
                      })
                    }
                  >
                    {purchase?.month} / {purchase.year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className={style.dropDown}>
              <Form.Label className="mt-3 fs-4">Choose a Day</Form.Label>
              <Dropdown.Toggle
                className={style.toggle}
                id="day"
                variant="secondary"
              >
                Choose a Day
              </Dropdown.Toggle>

              <Dropdown.Menu className={style.toggle} style={{ width: "auto" }}>
                {dateList.map((date, index) => (
                  <Dropdown.Item
                    key={index}
                    // onClick={
                    //   () => {}
                    //   // setSelectedMonth({
                    //   //   month: Number(Months[purchase.month as Months]),
                    //   //   year: purchase.year,
                    //   // })
                    // }
                  >
                    {date}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
              <Form.Group
                controlId="title"
                className="d-flex flex-column align-items-center mt-3 fs-4"
              >
                <Form.Label>Insert expends amount </Form.Label>
                <Form.Control
                  required
                  //  onChange={(e) => onChange(e)}
                  //value={value}

                  style={{ width: 373, height: 44, padding: 0 }}
                  //  placeholder={placeholder}
                />
              </Form.Group>
            </Dropdown>
            <p className="mt-3 fs-4">Great! what to do now?</p>
            <div className="d-flex">
              {buttonsList.map((button, index) => (
                <BigButton
                  key={index}
                  onClick={() => {}}
                  variant={button?.color}
                >
                  <Image src={button.image} width={20} height={20} />
                </BigButton>
              ))}
            </div>
          </div>
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
