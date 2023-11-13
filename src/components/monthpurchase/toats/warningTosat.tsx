import { Toast } from "react-bootstrap";
import bin from "../../../assets/trash-alt.svg";
import { ReactElement } from "react";

function WarningToast({
  onClose,
  showToast,
  toastMessage,
  headerTitle,
  toastButtons,
}: {
  onClose: () => void;
  showToast: boolean;
  toastMessage: string | ReactElement;
  headerTitle: string;
  toastButtons: ReactElement;
}) {
  return (
    <Toast
      onClose={onClose}
      show={showToast}
      style={{
        zIndex: 10,
        position: "absolute",
      }}
      bg="danger"
    >
      <Toast.Header>
        <img src={bin} className="rounded me-2" alt="" />
        <strong className="me-auto">{headerTitle}</strong>
      </Toast.Header>
      <Toast.Body className="text-white">
        {toastMessage}
        {toastButtons}
      </Toast.Body>
    </Toast>
  );
}

export default WarningToast;
