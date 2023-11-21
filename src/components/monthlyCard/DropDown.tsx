import React, { CSSProperties, ReactElement } from "react";
import { Button, Dropdown, Image } from "react-bootstrap";
import menu from "../../assets/menu-icon.svg";
import styles from "./monthlyCard.module.css";
export type dropDownItems = {
  key: string;
  onClick: () => void;
  style: CSSProperties;
}[];

function DropDown({ dropDownItems }: { dropDownItems: dropDownItems }) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
      <Dropdown.Menu as={CustomMenu} rootCloseEvent={"mousedown"}>
        {dropDownItems.map(({ onClick, key, style }) => (
          <Dropdown.Item eventKey={key} onClick={onClick} style={style}>
            {key}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const CustomToggle = React.forwardRef<
  HTMLDivElement,
  { onClick: (e: React.MouseEvent<HTMLElement>) => void }
>(({ onClick }, ref) => (
  <div ref={ref} style={{ position: "absolute", zIndex: 2, right: 5, top: 5 }}>
    <Button
      variant="white"
      onClick={onClick}
      className={`border border-0 rounded-circle d-flex align-items-center justify-content-center  mb-1  shadow ${styles.dropDown}  `}
    >
      <Image src={menu} />
    </Button>
  </div>
));

const CustomMenu = React.forwardRef<HTMLDivElement, { children: ReactElement }>(
  ({ children, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      style={{
        position: "absolute",
        zIndex: 2,
        right: -60,
        top: 20,
        width: 100,
        backgroundColor: "whitesmoke",
        borderRadius: 5,
        padding: 0,
      }}
    >
      {children}
    </div>
  )
);
export default DropDown;
