import BottomSheet from "../../bottomSheet/BottomSheet";
import { CloseButton, Form, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import style from "../monthPurchase.module.css";
import { BigButton, SmallButton } from "../../button";
import check from "../../../assets/check.svg";
import bin from "../../../assets/trash-alt.svg";
import { Expends } from "../../../App";
import { Months } from "../../../utils/days";
import { useMemo, useState } from "react";
import { initialPurchaseDate } from "../context/monthlyPurchaseStates";
import WarningToast from "../toats/warningTosat";

export type PurchaseProps = {
  month: string;
  date?: Date;
  year: number;
  monthId?: string;
  remain: number;
  total: number;
  expends: Expends[];
  sumAllExpendsAmounts: number;
};
function BottomSheetMonthContent() {
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const {
    transaction,
    monthly: {
      onMonthBottomSheetClose,
      onCreatePurchase,
      onUpdatePurchase,
      onDeletePurchase,
    },
    dispatch,
    purchaseData,
    isTotalValid,
  } = useMonthPurchaseContext();

  const excludedDate = useMemo(
    () => transaction.purchases.map((purchase) => new Date(purchase?.date)),
    [transaction]
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

  const handleEditTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTotal = Number(e.target.value);
    // const amount = purchaseData.expends.reduce((total, value) => {
    //   return total + value.amount;
    // }, 0);

    dispatch({
      type: "isTotalValid",
      data: purchaseData.sumAllExpendsAmounts > currentTotal,
    });

    dispatch({
      type: "purchaseData",
      data: {
        ...purchaseData,
        total: currentTotal,
        remain: currentTotal,
      },
    });
  };

  return (
    <BottomSheet
      closeButton={
        <CloseButton
          onClick={() => {
            onMonthBottomSheetClose(),
              dispatch({ type: "purchaseData", data: initialPurchaseDate });
            dispatch({ type: "isTotalValid", data: false });
          }}
        />
      }
    >
      <WarningToast
        onClose={() => setShowDeleteToast(false)}
        showToast={showDeleteToast}
        toastMessage={
          <h5>
            {`are you sure you want to delete purchases of ${purchaseData.month}
            /${purchaseData.year}?`}
          </h5>
        }
        headerTitle={`Delete ${purchaseData.month}'s Purchases`}
        toastButtons={
          <div className="d-flex justify-content-center mt-3">
            <SmallButton
              variant="red"
              onClick={() => onDeletePurchase(purchaseData.monthId!)}
              image={check}
            />
          </div>
        }
      />
      <Form className="d-flex flex-column align-items-center mt-3 fs-5">
        <Form.Label className="fs-4">Choose a Month</Form.Label>
        <DatePicker
          disabled={purchaseData.monthId ? true : false}
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
          renderMonthContent={(_index, _month, longMonth) => (
            <span>{longMonth}</span>
          )}
          showMonthYearPicker
          dateFormat="MMMM/yyyy"
        />
      </Form>
      <BottomSheet.input
        title="Choose planing total"
        type="number"
        isInvalid={isTotalValid}
        errorMessage=" the amount is too low!"
        min={0}
        value={purchaseData.total.toString()}
        onChange={handleEditTotal}
      />

      <div className="d-flex flex-row align-items-center">
        <BigButton
          disable={isTotalValid}
          bigButtonStyle="m-2"
          variant="#B6B5ED"
          onClick={handleClick}
        >
          <Image src={check} />
        </BigButton>
        {purchaseData.monthId && (
          <BigButton
            bigButtonStyle="m-2"
            variant="red"
            onClick={() => setShowDeleteToast(true)}
          >
            <Image src={bin} />
          </BigButton>
        )}
      </div>
    </BottomSheet>
  );
}

export default BottomSheetMonthContent;
