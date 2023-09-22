import React from "react";
import BottomSheet from "../../bottomSheet/BottomSheet";
import { CloseButton, Form, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import style from "../monthPurchase.module.css";
import { BigButton } from "../../button";
import check from "../../../assets/check.svg";
function BottomSheetMonthContent() {
  const {
    monthly: { onMonthBottomSheetClose },
  } = useMonthPurchaseContext();
  const renderMonthContent = (month, shortMonth, longMonth) => {
    const tooltipText = `Tooltip for month: ${longMonth}`;
    return <span title={tooltipText}>{longMonth}</span>;
  };
  return (
    <BottomSheet
      closeButton={<CloseButton onClick={onMonthBottomSheetClose} />}
    >
      <Form className="d-flex flex-column align-items-center mt-3 fs-5">
        <Form.Label className="fs-4">Choose a Month</Form.Label>
        <DatePicker
          className={style.pickerInput}
          onChange={(data) => console.log(data)}
          selected={new Date()}
          renderMonthContent={renderMonthContent}
          showMonthYearPicker
          dateFormat="MMMM/yyyy"
        />
      </Form>
      <BottomSheet.input title="Choose planing total" type="number" min={0} />
      <BigButton bigButtonStyle="m-2" variant="#B6B5ED">
        <Image src={check} />
      </BigButton>
    </BottomSheet>
  );
}

export default BottomSheetMonthContent;
