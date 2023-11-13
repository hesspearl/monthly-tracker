import { Toast } from "react-bootstrap";

function NotificationToast({
  onClose,
  showToast,
  toastMessage,
}: {
  onClose: () => void;
  showToast: boolean;
  toastMessage: string;
}) {
  return (
    <Toast
      autohide
      onClose={onClose}
      show={showToast}
      style={{
        zIndex: 10,
        position: "absolute",
        top: 0,
        right: 0,
      }}
      bg="danger"
    >
      <Toast.Body className="text-white">{toastMessage}</Toast.Body>
    </Toast>
  );
}

export default NotificationToast;
