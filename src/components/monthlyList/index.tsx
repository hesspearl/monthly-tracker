import { useState, useMemo, useRef } from "react";
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
//import TransactionsInputs from "./TransactionsInputs";

import MonthlyCard, { MonthlyCardProps } from "../monthlyCard";
import FormInput from "../formInput";
import CreatePurchase, { CreatePurchaseProps } from "../createPurchase";
import styles from "./monthlyList.module.css";
import { getDate } from "../../utils/days";
import check from "../../assets/check.svg";

export type MonthlyListProps = {
  Transactions: MonthlyCardProps[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
} & CreatePurchaseProps;

function MonthlyList({
  availableTags,
  Transactions,
  onDeleteTag,
  onUpdateTag,
  selectedTags,
  setSelectedTags,
  onAddTag,
  onSubmit,
}: MonthlyListProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");
  const [updateTag, setUpdateTag] = useState<{ tag: string; id: string }>({
    tag: "",
    id: "",
  });
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);
  const { currentMonth: theMonth, year, theDay, month } = getDate;

  const filteredTransactions = useMemo(
    () =>
      Transactions?.filter(
        (transaction) =>
          !text.length ||
          transaction.title.toLowerCase().includes(text.toLocaleLowerCase()) ||
          transaction.tags?.some((transactionTag) =>
            transactionTag?.label
              .toLocaleLowerCase()
              .includes(text.toLocaleLowerCase())
          )
      ),

    [text, Transactions]
  );

  const closeTagList = () => setEditTagsModalIsOpen(false);

  return (
    <Container className="mt-4">
      <PageTitle
        title={`Mϒ  Γist  ,${theMonth}`}
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
        {filteredTransactions?.map((transaction) => (
          <Col key={transaction.id}>
            <MonthlyCard {...transaction} />
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
        onHide={closeTagList}
        scrollable
        dialogClassName={styles.dialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableTags.map((tag, index) => (
            <InputGroup key={tag.id} className="my-2">
              <Form.Control
                autoFocus={index === 0}
                value={updateTag.id === tag.id ? updateTag.tag : tag.label}
                onChange={(e) =>
                  setUpdateTag({
                    tag: e.target.value,
                    id: tag.id,
                  })
                }
              />
              {updateTag.id === tag.id && (
                <Button
                  variant="success"
                  onClick={() => {
                    onUpdateTag(tag.id, updateTag.tag),
                      setUpdateTag({
                        tag: "",
                        id: "",
                      });
                  }}
                >
                  <Image src={check} style={{ width: 16, height: 16 }} />
                </Button>
              )}
              <Button
                variant="danger"
                onClick={() => {
                  onDeleteTag(tag.id),
                    setUpdateTag({
                      tag: "",
                      id: "",
                    });
                }}
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
