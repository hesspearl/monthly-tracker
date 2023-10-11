import { Modal } from "react-bootstrap";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import ImagesGallery from "../../imagesGallarey";

function GalleryModal() {
  const { openGallery, dispatch } = useMonthPurchaseContext();

  console.log(openGallery);
  return (
    <Modal
      show={openGallery}
      onHide={() => dispatch({ type: "openGallery", data: false })}
      scrollable
      //  dialogClassName={styles.dialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>Track Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImagesGallery />
      </Modal.Body>
    </Modal>
  );
}

export default GalleryModal;
