import { Badge, Button, Col, Form, Image, Row, Stack } from "react-bootstrap";
import edit from "../../../assets/setting.svg";

import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import { Link } from "react-router-dom";
function MonthPurchaseHeader() {
  const { editTitle, note, dispatch, title, editTitleHandler, image } =
    useMonthPurchaseContext();

  return (
    <Row className="justify-content-center px-4">
      <div
        style={{
          backgroundImage: `url(../../../${note.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "10%",
          height: "30%",
          zIndex: -1,
          opacity: 0.5,
          position: "absolute",
        }}
      />
      <Col>
        <Stack gap={1} direction="horizontal" className=" flex-wrap ">
          <h1>Expends Target :</h1>
          {!editTitle ? (
            <h1>{note.title}</h1>
          ) : (
            <Form>
              <Form.Control
                required
                onChange={(e) =>
                  dispatch({
                    type: "purchaseInfo",
                    data: { image, title: e.target.value },
                  })
                }
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
            onClick={() =>
              dispatch({ type: "editTagsModalIsOpen", data: true })
            }
          />
        </Stack>
        <Stack className="mt-5" style={{ width: "fit-content" }}>
          <Button
            variant="outline-primary"
            onClick={() => dispatch({ type: "openGallery", data: true })}
          >
            Edit Image
          </Button>
        </Stack>
      </Col>
      <Col xs="auto"></Col>
      <Col xs="auto">
        <Stack className="mt-5">
          <Link to={`/`}>
            <Button>Back</Button>
          </Link>
        </Stack>
      </Col>
    </Row>
  );
}

export default MonthPurchaseHeader;
