import { useEffect } from "react";
import i18next from "i18next";
import { Button, Col, Dropdown, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

interface PageTitleOptionalProps<WithButtons> {
  title: string;
  withButtons?: WithButtons;
  button1?: string;
  button2?: string;
}

interface OnClickOptions {
  onButtonClick?: () => void;
  onButton2Click?: () => void;
  linkTo?: string;
}

const languages = [
  { code: "en", name: "English", country_code: "us" },
  { code: "ar", name: "العربية", country_code: "bh", dir: "rtl" },
];

const PageTitle = <WithButtons extends boolean>({
  title,
  linkTo,
  withButtons,
  button1,
  onButtonClick,
  button2,
  onButton2Click,
}: //
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

          <Button variant="outline-secondary" onClick={onButton2Click}>
            {button2}
          </Button>

          <div className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle>Language</Dropdown.Toggle>
              <Dropdown.Menu>
                {languages.map((country) => (
                  <Dropdown.Item
                    key={country.country_code}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => i18next?.changeLanguage(country.code)}
                  >
                    <span
                      className={`flag-icon flag-icon-${country.country_code} mx-2`}
                    ></span>
                    {country.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Stack>
      </Col>
    </Row>
  );
};

export default PageTitle;
