import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNote } from "../../hook/useNote";
import style from "./monthPurchase.module.css";
import MonthlyRow from "./monthlyRow";
import DailyRow from "./dailyRow";

interface NoteProps {
  onDelete: (id: string) => void;
}

function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Expends Target :{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className=" flex-wrap ">
              <h1>Tags</h1>
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate py-2 ">
                  {tag.label}
                </Badge>
              ))}
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
          <MonthlyRow />
          <DailyRow />
          <MonthlyRow current />
        </Stack>
      </div>
    </>
  );
}

export default Note;
