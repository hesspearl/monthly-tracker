import { Tag } from "../../App";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./monthlyCard.module.css";
import CarImage from "../../assets/checklistwithcars.jpg";
export interface MonthlyCardProps {
  id: string;
  title: string;
  tags: Tag[];
}
function MonthlyCard({ id, title, tags }: MonthlyCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={` text-reset text-decoration-none  ${styles.card}`}
    >
      <Card.Img variant="top" src={CarImage} style={{ height: 150 }} />
      <Card.Body className="rounded shadow" style={{ height: 100 }}>
        <Stack gap={2} className=" h-100">
          <Stack direction="horizontal" className="justify-content-between ">
            <span className="fs-4"> {title} </span>

            <Badge bg="secondary" pill className="mt-1 border">
              200$
            </Badge>
          </Stack>

          {tags.length > 0 && (
            <Stack
              gap={4}
              direction="horizontal"
              className="justify-content-center flex-wrap "
            >
              {tags.map((tag) => (
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
