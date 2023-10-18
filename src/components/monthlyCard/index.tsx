import { Note } from "../../App";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./monthlyCard.module.css";

export type MonthlyCardProps = Note;

function MonthlyCard({ id, title, tags, total, image }: MonthlyCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={` text-reset text-decoration-none  ${styles.card}`}
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
  );
}

export default MonthlyCard;
