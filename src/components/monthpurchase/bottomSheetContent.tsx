import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CloseButton, Dropdown, Form, Image, Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";
import { Day, Months, getDate } from "../../utils/days";
import check from "../../assets/check.svg";
import calender from "../../assets/calendar-alt.svg";
import pencil from "../../assets/pencil-alt.svg";
import cart from "../../assets/cart-plus.svg";
import { useNote } from "../../hook/useNote";
import { BigButton, SmallButton } from "../button";
import { useDelay } from "../../hook/useDelay";
import MonthlyPurchase from ".";
import BottomSheet from "../bottomSheet/BottomSheet";
import BottomSheetDropDown from "../bottomSheet/BottomSheetDropDown";
import BottomSheetInput from "../bottomSheet/BottomSheetInput";
import BottomSheetButton from "../bottomSheet/BottomSheetButton";

export type ExpendsProps = {
  month: number;
  monthId: string;
  year: number;
  showDate: string;
  day: [string, string];
  date: number;
  amount: number | string;
  remain: number;
  previousAmount?: number; // store the previous amount before edit
  expendId?: string; // id of edited expend
};

function BottomSheetContent({
  bottomSheetHandler,
  onCreateExpend,
  onOpenMonthClicked,
  steps,
  setSteps,
  selectedMonth,
  setSelectedMonth,
  onClose,
  onUpdateExpends,
}: {
  bottomSheetHandler: (height: string, close?: boolean) => void;
  onCreateExpend: (data: ExpendsProps) => void;
  onUpdateExpends: (data: ExpendsProps) => void;
  onOpenMonthClicked: (id: string) => void;
  steps: number;
  setSteps: Dispatch<number>;
  selectedMonth: ExpendsProps;
  setSelectedMonth: Dispatch<SetStateAction<ExpendsProps>>;
  onClose: () => void;
}) {
  const note = useNote();

  const { day, theDay } = getDate(new Date());

  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month, i + 1)
    );

  const dateList = useMemo(() => {
    return getAllDaysInMonth(selectedMonth.month, selectedMonth.year).map(
      (date) => {
        return {
          showDate: `${date.getDate()}, ${Object.keys(Day)[date.getDay()]}`,
          day: [
            Object.values(Day)[date.getDay()],
            Object.keys(Day)[date.getDay()],
          ] as [string, string],
          date: date.getDate(),
        };
      }
    );
  }, [selectedMonth]);

  const onSubmit = () => {
    if (typeof selectedMonth.amount !== "number") {
      return;
    }
    if (selectedMonth.expendId) {
      onUpdateExpends(selectedMonth);
    } else {
      onCreateExpend(selectedMonth);
    }

    onClose();
  };

  const onNewPurchase = () => {
    if (typeof selectedMonth.amount !== "number") {
      return;
    }
    onCreateExpend(selectedMonth);
    setSelectedMonth((selected) => ({ ...selected, amount: "" }));
  };

  const buttonsList = [
    {
      image: check,
      onClick: onSubmit,
      color: "#B6B5ED",
    },
    { image: cart, onClick: onNewPurchase, color: "red" },
  ];

  const chooseDayHandler = (date: {
    showDate: string;
    day: [string, string];
    date: number;
  }) => {
    setSelectedMonth((selected) => ({
      ...selected,
      ...date,
    }));
    setSteps(3);
    bottomSheetHandler("75%");
  };
  return (
    <BottomSheet
      data={selectedMonth}
      closeButton={<CloseButton onClick={onClose} />}
      footerStyle={{ display: steps > 2 ? "flex" : "none" }}
      footer={
        <>
          <BottomSheetInput
            title="Insert expends amount "
            isInvalid={(selectedMonth.amount as number) > selectedMonth.remain}
            required
            min={0}
            onChange={(e) =>
              setSelectedMonth((selected) => ({
                ...selected,
                amount: Number(e.target.value),
              }))
            }
            value={selectedMonth.amount}
            type="number"
          />
          <BottomSheetButton
            buttonsList={buttonsList}
            title="Great! what to do now?"
          />
        </>
      }
    >
      <BottomSheetDropDown
        title="Choose a Month"
        toggleTitle={
          steps > 1
            ? `${Months[selectedMonth.month]} / ${selectedMonth.year} `
            : "Choose Month"
        }
        containerStyle={{ display: "flex" }}
        menuContent={note.purchases.map((purchase) => (
          <Dropdown.Item
            key={purchase.id}
            disabled={purchase.remain === 0}
            onClick={() => {
              setSelectedMonth((selected) => ({
                ...selected,
                month: Number(Months[purchase.month as Months]),
                year: purchase.year,
                monthId: purchase.id,
                remain: purchase.remain,
              }));
              setSteps(2);
              onOpenMonthClicked(purchase.id);
              bottomSheetHandler("40%");
            }}
          >
            {purchase?.month} / {purchase.year}
          </Dropdown.Item>
        ))}
      />
      <BottomSheetDropDown
        title="Choose a Day"
        toggleTitle={steps > 2 ? selectedMonth.showDate : "Choose a Day"}
        customToggle={
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
        }
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

export default BottomSheetContent;
