import BottomSheet from "../../bottomSheet/BottomSheet";
import { CloseButton, Form, Image, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import style from "../monthPurchase.module.css";
import { BigButton } from "../../button";
import check from "../../../assets/check.svg";
import bin from "../../../assets/trash-alt.svg";
import { Expends } from "../../../App";
import { Months } from "../../../utils/days";
import { useMemo } from "react";
import { initialPurchaseDate } from "../context/monthlyPurchaseStates";

export type PurchaseProps = {
  month: string;
  date?: Date;
  year: number;
  monthId?: string;
  remain: number;
  total: number;
  expends: Expends[];
};
function BottomSheetMonthContent() {
  const {
    note,
    monthly: {
      onMonthBottomSheetClose,
      onCreatePurchase,
      onUpdatePurchase,
      onDeletePurchase,
    },
    dispatch,
    purchaseData,
  } = useMonthPurchaseContext();

  const excludedDate = useMemo(
    () => note.purchases.map((purchase) => new Date(purchase?.date)),
    [note]
  );

  const handleClick = () => {
    if (purchaseData.monthId) {
      onUpdatePurchase(purchaseData);
      handleCloseBottomSheet();
      return;
    }
    onCreatePurchase(purchaseData);
    handleCloseBottomSheet();
  };

  const handleCloseBottomSheet = () => {
    onMonthBottomSheetClose();
    dispatch({ type: "purchaseData", data: initialPurchaseDate });
  };

  return (
    <BottomSheet
      closeButton={
        <CloseButton
          onClick={() => {
            onMonthBottomSheetClose(),
              dispatch({ type: "purchaseData", data: initialPurchaseDate });
          }}
        />
      }
    >
      <Form className="d-flex flex-column align-items-center mt-3 fs-5">
        <Form.Label className="fs-4">Choose a Month</Form.Label>
        <DatePicker
          excludeDates={excludedDate}
          className={style.pickerInput}
          onChange={(data) => {
            const value = data as Date;
            dispatch({
              type: "purchaseData",
              data: {
                ...purchaseData,
                date: value,
                month: Months[value.getMonth()],
                year: value.getFullYear(),
              },
            });
          }}
          // value={purchaseData.month.toString()}
          selected={purchaseData.date}
          renderMonthContent={(index, month, longMonth) => (
            <span>{longMonth}</span>
          )}
          showMonthYearPicker
          dateFormat="MMMM/yyyy"
        />
      </Form>
      <BottomSheet.input
        title="Choose planing total"
        type="number"
        min={0}
        value={purchaseData.total.toString()}
        onChange={(e) =>
          dispatch({
            type: "purchaseData",
            data: {
              ...purchaseData,
              total: Number(e.target.value),
              remain: Number(e.target.value),
            },
          })
        }
      />
      <div className="d-flex flex-row align-items-center">
        <BigButton bigButtonStyle="m-2" variant="#B6B5ED" onClick={handleClick}>
          <Image src={check} />
        </BigButton>
        {purchaseData.monthId && (
          <BigButton
            bigButtonStyle="m-2"
            variant="red"
            onClick={() => onDeletePurchase(purchaseData.monthId!)}
          >
            <Image src={bin} />
          </BigButton>
        )}
      </div>
    </BottomSheet>
  );
}

export default BottomSheetMonthContent;
