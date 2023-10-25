import { Badge, Button, Col, Form, Image, Stack } from "react-bootstrap";
import edit from "../../../assets/setting.svg";

import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import { Link } from "react-router-dom";
import styles from "../monthPurchase.module.css";

function MonthPurchaseHeader() {
  const { editTitle, transaction, dispatch, title, editTitleHandler, image } =
    useMonthPurchaseContext();

  return (
    <div>
      <div
        className={styles.headerBackground}
        style={{
          backgroundImage: `url(../../../${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: image.includes("checkListWithClothes")
            ? "70%"
            : image.includes("checklistwithMoney")
            ? "30%"
            : "10%",
        }}
      />
      <div className="px-4">
        <Col>
          <Stack gap={1} direction="horizontal" className=" flex-wrap ">
            <h1>Expends Target :</h1>
            {!editTitle ? (
              <h1>{transaction.title}</h1>
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
                />
              </Form>
            )}
            <Image src={edit} role="button" onClick={editTitleHandler} />
          </Stack>

          <Stack gap={1} direction="horizontal" className=" flex-wrap ">
            <h1>Tags :</h1>
            {transaction?.tags?.length > 0 &&
              transaction.tags.map((tag) => (
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
            <Stack className="position-relative">
              <Link to={`/`}>
                <Button className="position-absolute end-0 top-0">Back</Button>
              </Link>
            </Stack>
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
      </div>
    </div>
  );
}

export default MonthPurchaseHeader;
