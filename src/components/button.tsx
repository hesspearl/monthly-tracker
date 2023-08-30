import React, { ReactElement } from "react";
import { Button, Image } from "react-bootstrap";

export function SmallButton({
  variant,
  image,
  text,
  onClick,
  smallButtonStyle,
}: {
  variant: string;
  image?: string;
  text?: string;
  smallButtonStyle?: string;
  onClick: () => void;
}) {
  return (
    <Button
      bsPrefix={smallButtonStyle}
      variant={variant}
      className={`border border-light-subtle rounded-circle d-flex align-items-center justify-content-center  mb-1  shadow  `}
      style={{ width: 50, height: 50, backgroundColor: variant }}
      onClick={onClick}
    >
      {image ? <Image src={image} width={20} height={20} /> : text}
    </Button>
  );
}

export const BigButton = ({
  children,
  onClick,
  bigButtonStyle,
  variant,
}: {
  children: ReactElement;
  onClick: () => void;
  bigButtonStyle?: string;
  variant?: string;
}) => {
  return (
    <Button
      bsPrefix={bigButtonStyle}
      className="border border-light-subtle rounded-circle d-flex align-items-center justify-content-center mx-2 shadow  "
      style={{ width: 80, height: 80, backgroundColor: variant ?? "#D9D9D9" }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
