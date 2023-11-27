import { useMemo } from "react";
import { CloseButton, Dropdown } from "react-bootstrap";
import { Day, Months, getDate } from "../../../utils/days";
import check from "../../../assets/check.svg";
import calender from "../../../assets/calendar-alt.svg";

import { SmallButton } from "../../button";
import BottomSheet from "../../bottomSheet/BottomSheet";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
import { DayBottomSheetHights } from "./bottomSheetHight";

export type ExpendsProps = {
  month: number;
  monthId: string;
  year: number;
  showDate: string;
  day: [string, string];
  date: number;
  amount: number | string;
  remain: number;
  total: number;
  title: string;
  previousAmount?: number; // store the previous amount before edit
  expendId?: string; // id of edited expend
};

function BottomSheetDayContent() {
  const {
    transaction,
    purchaseData,
    expendData,
    steps,
    daily: { onUpdateExpends, onCreateExpend, onEditExpendBottomSheetClose },
    dispatch,
    bottomSheetHandler,
    monthly: { onOpenMonthClicked },
  } = useMonthPurchaseContext();

  const { day, theDay, currentMonth } = getDate;

  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month, i + 1)
    );

  const dateList = useMemo(() => {
    return getAllDaysInMonth(expendData.month, expendData.year).map((date) => {
      return {
        showDate: `${date.getDate()}, ${Object.keys(Day)[date.getDay()]}`,
        day: [
          Object.values(Day)[date.getDay()],
          Object.keys(Day)[date.getDay()],
        ] as [string, string],
        date: date.getDate(),
      };
    });
  }, [expendData]);

  const onSubmit = () => {
    if (typeof expendData.amount !== "number" || !expendData.title) {
      return;
    }
    if (expendData.expendId) {
      onUpdateExpends(expendData);
    } else {
      onCreateExpend(expendData);
    }

    onEditExpendBottomSheetClose();
  };

  const inValid = useMemo(() => {
    const expendingAmount = expendData.amount as number;
    if (purchaseData?.expends.length === 1 && expendData.expendId) {
      return expendingAmount > expendData.total;
    }

    if (expendData.remain === 0) {
      return expendingAmount > expendData.previousAmount!;
    }
    return (
      purchaseData.sumAllExpendsAmounts -
        expendData.previousAmount! +
        expendingAmount >
      expendData.total
    );
  }, [expendData, purchaseData]);

  const buttonsList = [
    {
      image: check,
      onClick: onSubmit,
      color: "#B6B5ED",
      disable: inValid,
    },
    // { image: cart, onClick: onNewPurchase, color: "red" },
  ];

  const chooseDayHandler = (date: {
    showDate: string;
    day: [string, string];
    date: number;
  }) => {
    dispatch({ type: "expendData", data: { ...expendData, ...date } });
    dispatch({ type: "steps", data: 3 });
    bottomSheetHandler(DayBottomSheetHights.MAX_HEIGHT);
  };

  const ShowTodayButton = (month: string) => {
    if (month === currentMonth) {
      return (
        <SmallButton
          image={calender}
          variant="secondary"
          onClick={() =>
            chooseDayHandler({
              showDate: `${day}, ${Object.keys(Day)[theDay]}`,
              day: [Object.values(Day)[theDay], Object.keys(Day)[theDay]],
              date: day,
            })
          }
        />
      );
    } else return <div />;
  };
  return (
    <BottomSheet
      closeButton={<CloseButton onClick={onEditExpendBottomSheetClose} />}
      footerStyle={{ display: steps > 2 ? "flex" : "none" }}
      footer={
        <>
          <BottomSheet.input
            title="Insert title"
            isInvalid={!expendData.title}
            required
            onChange={(e) =>
              dispatch({
                type: "expendData",
                data: { ...expendData, title: e.target.value },
              })
            }
            value={expendData.title}
            type="text"
          />
          <BottomSheet.input
            title="Insert expends amount "
            isInvalid={inValid}
            required
            min={0}
            onChange={(e) =>
              dispatch({
                type: "expendData",
                data: { ...expendData, amount: Number(e.target.value) },
              })
            }
            value={expendData.amount}
            type="number"
          />
          <BottomSheet.button
            buttonsList={buttonsList}
            title="Great! what to do now?"
          />
        </>
      }
    >
      <BottomSheet.dropDown
        title="Choose a Month"
        toggleTitle={
          steps > 1
            ? `${Months[expendData.month]} / ${expendData.year} `
            : "Choose Month"
        }
        containerStyle={{ display: "flex" }}
        menuStyle={{ height: "auto" }}
        menuContent={transaction.purchases.map((purchase) => (
          <Dropdown.Item
            key={purchase.id}
            disabled={purchase.remain === 0}
            onClick={() => {
              dispatch({
                type: "expendData",
                data: {
                  ...expendData,
                  month: Number(Months[purchase.month as Months]),
                  year: purchase.year,
                  monthId: purchase.id,
                  remain: purchase.remain,
                },
              });
              dispatch({ type: "steps", data: 2 });

              onOpenMonthClicked(purchase.id);
              bottomSheetHandler(DayBottomSheetHights.MED_HEIGHT);
            }}
          >
            {purchase?.month} / {purchase.year}
          </Dropdown.Item>
        ))}
      />
      <BottomSheet.dropDown
        title="Choose a Day"
        toggleTitle={steps > 2 ? expendData.showDate : "Choose a Day"}
        customToggle={ShowTodayButton(Months[expendData.month])}
        containerStyle={{ display: steps > 1 ? "flex" : "none" }}
        menuStyle={{
          height: 300,
          overflowY: "scroll",
        }}
        menuContent={dateList.map((date, index) => (
          <Dropdown.Item key={index} onClick={() => chooseDayHandler(date)}>
            {date.showDate}
          </Dropdown.Item>
        ))}
      />
    </BottomSheet>
  );
}

export default BottomSheetDayContent;
