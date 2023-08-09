import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

interface PageTitleOptionalProps<WithButtons> {
  title: string;
  withButtons?: WithButtons;
  button1?: string;
  // button2?: string;
}

interface OnClickOptions {
  onButtonClick?: () => void;
  linkTo?: string;
}

const PageTitle = <WithButtons extends boolean>({
  title,
  linkTo,
  withButtons,
  button1,
  onButtonClick,
}: // button2,
// ,
WithButtons extends true
  ? Required<PageTitleOptionalProps<WithButtons>> & OnClickOptions
  : PageTitleOptionalProps<WithButtons> & OnClickOptions) => {
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
          <Link to={linkTo ?? ""}>
            <Button variant="primary" onClick={onButtonClick}>
              {button1}
            </Button>
          </Link>
          {/* 
          <Button variant="outline-secondary" onClick={onButton2Click}>
            {button2}
          </Button> 
          */}
        </Stack>
      </Col>
    </Row>
  );
};

export default PageTitle;
