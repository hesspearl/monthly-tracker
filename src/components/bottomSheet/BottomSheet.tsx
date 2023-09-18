import { CSSProperties, ReactNode } from "react";
import style from "./BottomSheet.module.css";
import { Stack } from "react-bootstrap";
import BottomSheetContext from "./BottomSheetContext";

interface BottomSheetProps<T> {
  closeButton: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  data: T;
}
function BottomSheet<T extends object>({
  closeButton,
  children,
  containerStyle,
  footer,
  footerStyle,
  headerStyle,
  data,
}: BottomSheetProps<T>) {
  return (
    <BottomSheetContext.Provider value={{ data }}>
      <div
        className={`${style.bottomSheet} `}
        id="bottomSheet"
        style={containerStyle}
      >
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
      </div>
    </BottomSheetContext.Provider>
  );
}

export default BottomSheet;
