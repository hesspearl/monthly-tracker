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
    transaction,
    monthly: { onOpenMonthClicked },
    openMonthPurchase,
    bottomSheetType,
  } = useMonthPurchaseContext();
  const { currentMonth } = getDate;

  return (
    <div className="d-flex justify-content-center  ">
      <Stack className={`  p-3 ${style.container}`}>
        <Stack
          gap={3}
          style={{ overflowY: "scroll", overflowX: "hidden", padding: 10 }}
        >
          {transaction.purchases.map((purchase) => {
            return (
              <div key={purchase.id}>
                <MonthlyRow
                  onMonthClick={() => onOpenMonthClicked(purchase.id)}
                  current={purchase.month === currentMonth}
                  {...{ ...purchase, month: purchase.month as string }}
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
              </div>
            );
          })}
          <div className={`${style.bottomSheet} `} id="bottomSheet">
            {bottomSheetType === "edit-expend" && <BottomSheetDayContent />}
            {bottomSheetType === "delete-Expend" && <BottomSheetDeleteDayRow />}
            {bottomSheetType === "edit-month" && <BottomSheetMonthContent />}
          </div>
        </Stack>
      </Stack>
    </div>
  );
}

export default MonthPurchaseBody;
