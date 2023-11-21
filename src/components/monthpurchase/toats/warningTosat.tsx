import { Toast } from "react-bootstrap";
import bin from "../../../assets/trash-alt.svg";
import { CSSProperties, ReactElement } from "react";

function WarningToast({
  onClose,
  showToast,
  toastMessage,
  headerTitle,
  toastButtons,
  containerStyle,
}: {
  onClose: () => void;
  showToast: boolean;
  toastMessage: string | ReactElement;
  headerTitle: string;
  toastButtons: ReactElement;
  containerStyle?: CSSProperties;
}) {
  return (
    <Toast
      onClose={onClose}
      show={showToast}
      style={{
        zIndex: 10,
        position: "absolute",
        ...containerStyle,
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
