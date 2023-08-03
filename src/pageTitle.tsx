import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

interface PageTitleOptionalProps<WithButtons> {
  title: string;
  withButtons?: WithButtons;
  linkTo?: string;
  button1?: string;
  // button2?: string;
  // onButton2Click?: () => void;
}

const PageTitle = <WithButtons extends boolean>({
  title,
  linkTo,
  withButtons,
  button1,
}: // button2,
// onButton2Click,
WithButtons extends true
  ? Required<PageTitleOptionalProps<WithButtons>>
  : PageTitleOptionalProps<WithButtons>) => {
  if (!withButtons) {
    return <h1 className="mb-4">{title}</h1>;
  }
  return (
    <Row className="align-items-center mb-4">
      <Col>
        <h1 className="mb-4">{title}</h1>
      </Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
          <Link to={linkTo}>
            <Button variant="primary">{button1}</Button>
          </Link>
          {/* <Button variant="outline-secondary" onClick={onButton2Click}>
            {button2}
          </Button> */}
        </Stack>
      </Col>
    </Row>
  );
};

export default PageTitle;
