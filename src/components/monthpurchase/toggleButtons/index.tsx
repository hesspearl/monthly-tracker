import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { BigButton, SmallButton } from "../../button";
import cart from "../../../assets/cart-plus.svg";
import calender from "../../../assets/calendar-alt.svg";
import style from "../monthPurchase.module.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";

function ToggleButtons() {
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const {
    daily: { onDayBottomSheetOpen },
    monthly: { onMonthBottomSheetOpen },
  } = useMonthPurchaseContext();

  return (
    <ButtonGroup
      vertical
      className="position-fixed bottom-0 end-0 m-4 align-items-center"
    >
      <>
        <SmallButton
          variant="black"
          onClick={() => {
            onMonthBottomSheetOpen(), setOpenToggle(false);
          }}
          image={calender}
          smallButtonStyle={
            openToggle ? style.transition2 : style.smallButtonStyle2
          }
        />
        <SmallButton
          variant="red"
          image={cart}
          onClick={() => {
            onDayBottomSheetOpen();
            setOpenToggle(false);
          }}
          smallButtonStyle={
            openToggle ? style.transition1 : style.smallButtonStyle
          }
        />
      </>

      <BigButton
        onClick={() => {
          setOpenToggle((toggle) => !toggle);
        }}
        // bigButtonStyle={style.bigButtonStyle}
      >
        <h1>{openToggle ? "×" : "+"}</h1>
      </BigButton>
    </ButtonGroup>
  );
}

export default ToggleButtons;
