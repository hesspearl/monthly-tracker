import { Modal, Button } from "react-bootstrap";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import ImagesGallery from "../../imagesGallarey";

function GalleryModal() {
  const { openGallery, dispatch, image, title, editImageHandler, note } =
    useMonthPurchaseContext();
  const handleCloseModal = () => dispatch({ type: "openGallery", data: false });

  const onSubmit = () => {
    editImageHandler();
    handleCloseModal();
  };

  return (
    <Modal show={openGallery} onHide={handleCloseModal}>
      <Modal.Header
        closeButton
        onHide={() =>
          dispatch({ type: "purchaseInfo", data: { title, image: note.image } })
        }
      >
        <Modal.Title>Gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center ">
        <ImagesGallery
          onClick={(img) =>
            dispatch({ type: "purchaseInfo", data: { title, image: img } })
          }
          currentImage={image}
        />
        <Button onClick={onSubmit} className="mt-3">
          submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default GalleryModal;
