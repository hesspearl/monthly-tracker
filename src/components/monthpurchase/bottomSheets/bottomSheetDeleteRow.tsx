import BottomSheet from "../../bottomSheet/BottomSheet";
import { CloseButton } from "react-bootstrap";
import bin from "../../../assets/trash-alt.svg";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";

function BottomSheetDeleteDayRow() {
  const {
    expendData,
    daily: { onDeleteExpendBottomSheetClose, onDeleteExpend },
  } = useMonthPurchaseContext();
  return (
    <BottomSheet
      closeButton={<CloseButton onClick={onDeleteExpendBottomSheetClose} />}
    >
      <BottomSheet.button
        buttonsList={[
          {
            onClick: () => onDeleteExpend(expendData),
            color: "red",
            image: bin,
          },
        ]}
        title={
          <>
            Are sure you want to delete ?
            <p
              className="mt-2 fs-4"
              style={{
                textAlign: "center",
                color: "red",
                textDecorationLine: "line-through",
                fontStyle: "italic",
              }}
            >{`${expendData.showDate} |  -${expendData.amount}$`}</p>
          </>
        }
      />
    </BottomSheet>
  );
}

export default BottomSheetDeleteDayRow;
