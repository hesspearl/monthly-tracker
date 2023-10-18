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
    bottomSheetHandler,
    dispatch,
    monthly: { onMonthBottomSheetOpen },
  } = useMonthPurchaseContext();

  return (
    <ButtonGroup
      vertical
      className="position-fixed bottom-0 end-0 m-4 align-items-center"
      style={{ zIndex: 10 }}
    >
      <>
        <SmallButton
          variant="black"
          onClick={() => onMonthBottomSheetOpen()}
          image={calender}
          smallButtonStyle={
            openToggle ? style.transition2 : style.smallButtonStyle2
          }
        />
        <SmallButton
          variant="red"
          image={cart}
          onClick={() => {
            dispatch({
              type: "openMonthPurchase",
              data: { id: "", open: false },
            }),
              dispatch({ type: "bottomSheetTypes", data: "edit-expend" }),
              bottomSheetHandler("25%");
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
