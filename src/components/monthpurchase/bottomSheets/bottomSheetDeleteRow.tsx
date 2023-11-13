import BottomSheet from "../../bottomSheet/BottomSheet";
import { CloseButton, Image, Stack } from "react-bootstrap";
import bin from "../../../assets/trash-alt.svg";
import check from "../../../assets/check.svg";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";

function BottomSheetDeleteDayRow() {
  const {
    expendData,
    daily: { onDeleteExpendBottomSheetClose, onDeleteExpend },
  } = useMonthPurchaseContext();
  return (
    <BottomSheet
      headerStyle={{
        background: "#FAE1E3",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      closeButton={
        <>
          <Stack direction="horizontal" gap={2}>
            <Image src={bin} width={24} height={24} />
            <span
              style={{ fontWeight: "bold" }}
            >{`Delete ${expendData.showDate}'s expend`}</span>
          </Stack>

          <CloseButton onClick={onDeleteExpendBottomSheetClose} />
        </>
      }
    >
      <Stack
        style={{
          backgroundColor: "#DC3545",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 16,
        }}
      >
        <BottomSheet.button
          buttonsList={[
            {
              onClick: () => onDeleteExpend(expendData),
              color: "red",
              image: check,
            },
          ]}
          title={
            <>
              <h4 style={{ color: "white" }}>Are sure you want to delete ?</h4>
              <p
                className="mt-2 fs-4"
                style={{
                  textAlign: "center",
                  color: "white",
                  textDecorationLine: "line-through",
                  fontStyle: "italic",
                }}
              >{`${expendData.showDate} |  -${expendData.amount}$`}</p>
            </>
          }
        />
      </Stack>
    </BottomSheet>
  );
}

export default BottomSheetDeleteDayRow;
