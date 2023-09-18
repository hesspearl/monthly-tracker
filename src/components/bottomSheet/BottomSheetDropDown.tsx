import React, { CSSProperties, ReactNode } from "react";
import { Dropdown, Form, Stack } from "react-bootstrap";
import style from "./BottomSheet.module.css";

function BottomSheetDropDown({
  title,
  menuContent,
  customToggle,
  toggleTitle,
  containerStyle,
  menuStyle,
}: {
  title: string;
  menuContent: ReactNode;
  customToggle?: ReactNode;
  toggleTitle: string;
  containerStyle?: CSSProperties;
  menuStyle?: CSSProperties;
}) {
  return (
    <Dropdown
      data-bs-theme="dark"
      className={style.dropDown}
      style={containerStyle}
    >
      <Form.Label className="mt-3 fs-4">{title}</Form.Label>
      <Stack
        className={` flex-row align-items-center `}
        gap={1}
        style={{ width: 350 }}
      >
        <Dropdown.Toggle className={style.toggle} variant="secondary">
          {toggleTitle}
        </Dropdown.Toggle>
        {customToggle}
      </Stack>

      <Dropdown.Menu className={style.toggle} style={menuStyle}>
        {menuContent}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BottomSheetDropDown;
