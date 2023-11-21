import { Transaction } from "../../App";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./monthlyCard.module.css";
import DropDown, { dropDownItems } from "./DropDown";
import WarningToast from "../monthpurchase/toats/warningTosat";
import { useState } from "react";
import { SmallButton } from "../button";
import check from "../../assets/check.svg";

export type MonthlyCardProps = Transaction & {
  onDeleteTransaction: () => void;
};
function MonthlyCard({
  id,
  title,
  tags,
  total,
  image,
  onDeleteTransaction,
}: MonthlyCardProps) {
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const dropDownItems: dropDownItems = [
    {
      key: "Delete",
      onClick: () => deleteCardHandler(),
      style: {
        borderColor: "red",
        color: "red",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
      },
    },
  ];
  const deleteCardHandler = () => {
    setShowDeleteToast(true);
  };
  return (
    <div style={{ position: "relative" }}>
      <WarningToast
        onClose={() => {
          setShowDeleteToast(false);
        }}
        containerStyle={{ left: -30, top: 50 }}
        showToast={showDeleteToast}
        toastMessage={<h5>{`are you sure you want to delete ${title} ?`}</h5>}
        headerTitle={`Delete `}
        toastButtons={
          <div className="d-flex justify-content-center mt-3">
            <SmallButton
              variant="red"
              onClick={onDeleteTransaction}
              image={check}
            />
          </div>
        }
      />
      <div className={styles.card}>
        <DropDown {...{ dropDownItems }} />

        <Card
          as={Link}
          to={`/${id}`}
          className={` text-reset text-decoration-none  `}
        >
          <Card.Img variant="top" src={image} style={{ height: 150 }} />
          <Card.Body className="rounded shadow" style={{ height: 150 }}>
            <Stack gap={2} className=" h-100 justify-content-between">
              <Stack
                direction="horizontal"
                className="justify-content-between align-items-center "
              >
                <span className="fs-5"> {title} </span>

                <Badge bg="secondary" pill className="mt-1 border">
                  {total}$
                </Badge>
              </Stack>

              {tags?.length > 0 && (
                <Stack
                  gap={2}
                  direction="horizontal"
                  className="justify-content-center  flex-wrap "
                >
                  {tags.slice(0, 6).map((tag) => (
                    <Badge
                      key={tag.id}
                      bg="secondary"
                      className="text-truncate py-2 "
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </Stack>
              )}
            </Stack>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MonthlyCard;
