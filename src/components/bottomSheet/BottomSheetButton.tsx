import React, { ReactNode } from "react";
import { BigButton } from "../button";
import { Image } from "react-bootstrap";

function BottomSheetButton({
  buttonsList,
  title,
}: {
  buttonsList: { onClick: () => void; color: string; image: string }[];
  title: string | ReactNode;
}) {
  return (
    <>
      <p className="mt-3 fs-4">{title}</p>
      <div className="d-flex">
        {buttonsList.map((button, index) => (
          <BigButton
            key={index}
            onClick={button.onClick}
            variant={button?.color}
          >
            <Image src={button.image} width={20} height={20} />
          </BigButton>
        ))}
      </div>
    </>
  );
}

export default BottomSheetButton;
