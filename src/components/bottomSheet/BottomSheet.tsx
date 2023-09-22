import { CSSProperties, ReactNode } from "react";
import style from "./BottomSheet.module.css";
import { Stack } from "react-bootstrap";
import BottomSheetContext from "./BottomSheetContext";
import BottomSheetInput from "./BottomSheetInput";
import BottomSheetDropDown from "./BottomSheetDropDown";
import BottomSheetButton from "./BottomSheetButton";

interface BottomSheetProps<T> {
  closeButton: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  footerStyle?: CSSProperties;
}
function BottomSheet<T extends object>({
  closeButton,
  children,
  containerStyle,
  footer,
  footerStyle,
  headerStyle,
}: BottomSheetProps<T>) {
  return (
    <>
      <div
        className="d-flex  border-bottom  p-2 "
        style={{
          width: "100%",
          justifyContent: "end",
          ...headerStyle,
        }}
      >
        {closeButton}
      </div>
      {children}
      <Stack
        style={footerStyle}
        className={` flex-column align-items-center  fs-4 ${style.footer}`}
      >
        {footer}
      </Stack>
    </>
  );
}

BottomSheet.input = BottomSheetInput;
BottomSheet.dropDown = BottomSheetDropDown;
BottomSheet.button = BottomSheetButton;

export default BottomSheet;
