import { Stack, Toast } from "react-bootstrap";
import MonthlyRow from "../rows/monthlyRow";
import DailyRow from "../rows/dailyRow";
import style from "../monthPurchase.module.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import { getDate } from "../../../utils/days";
import BottomSheetDayContent from "../bottomSheets/bottomSheetContent";
import BottomSheetDeleteDayRow from "../bottomSheets/bottomSheetDeleteRow";
import BottomSheetMonthContent from "../bottomSheets/bottomSheetMonthContent";
import { useEffect, useRef } from "react";
import NotificationToast from "../toats/notifactionToast";

function MonthPurchaseBody() {
  const {
    transaction,
    monthly: { onOpenMonthClicked },
    openMonthPurchase,
    bottomSheetType,
    purchaseData,
    isTotalValid,
    dispatch,
  } = useMonthPurchaseContext();
  const { currentMonth } = getDate;
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div className="d-flex justify-content-center  ">
      <NotificationToast
        onClose={() => dispatch({ type: "isTotalValid", data: false })}
        showToast={isTotalValid}
        toastMessage={`The Total should not be less than  the sum of all expends ${purchaseData.sumAllExpendsAmounts}$ on ${purchaseData.month}'s purchase `}
      />
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
          <div
            className={`${style.bottomSheet} `}
            id="bottomSheet"
            ref={bottomSheetRef}
          >
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
