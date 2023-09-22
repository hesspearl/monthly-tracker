import { Stack } from "react-bootstrap";
import MonthlyRow from "../rows/monthlyRow";
import DailyRow from "../rows/dailyRow";
import style from "../monthPurchase.module.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import { getDate } from "../../../utils/days";
import BottomSheetDayContent from "../bottomSheets/bottomSheetContent";
import BottomSheetDeleteDayRow from "../bottomSheets/bottomSheetDeleteRow";
import BottomSheetMonthContent from "../bottomSheets/bottomSheetMonthContent";

function MonthPurchaseBody() {
  const {
    note,
    monthly: { onOpenMonthClicked },
    openMonthPurchase,
    bottomSheetType,
  } = useMonthPurchaseContext();
  const { currentMonth } = getDate(new Date());

  return (
    <div className="d-flex justify-content-center  ">
      <Stack className={`  p-3 ${style.container}`}>
        <Stack gap={3} style={{ overflowY: "scroll", overflowX: "hidden" }}>
          {note.purchases.map((purchase) => {
            return (
              <>
                <MonthlyRow
                  onMonthClick={() => onOpenMonthClicked(purchase.id)}
                  key={purchase.id}
                  current={purchase.month === currentMonth}
                  {...purchase}
                />
                {openMonthPurchase.id === purchase.id &&
                  openMonthPurchase.open && (
                    <DailyRow
                      {...{
                        expends: purchase.expends,
                        monthPurchase: purchase,
                      }}
                    />
                  )}
              </>
            );
          })}
        </Stack>
        <div className={`${style.bottomSheet} `} id="bottomSheet">
          {bottomSheetType === "edit-expend" && <BottomSheetDayContent />}
          {bottomSheetType === "delete-Expend" && <BottomSheetDeleteDayRow />}
          {bottomSheetType === "edit-month" && <BottomSheetMonthContent />}
        </div>
      </Stack>
    </div>
  );
}

export default MonthPurchaseBody;
