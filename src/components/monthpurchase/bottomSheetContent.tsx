import React, { useMemo, useState } from "react";
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

export type ExpendsProps = {
  month: number;
  monthId: string;
  year: number;
  showDate: string;
  day: string;
  date: number;
  amount: number | string;
  remain: number;
};

function BottomSheetContent({
  bottomSheetHandler,
  onCreateExpend,
  onOpenMonthClicked,
}: {
  bottomSheetHandler: (height: string, close?: boolean) => void;
  onCreateExpend: (data: ExpendsProps) => void;
  onOpenMonthClicked: (id: string) => void;
}) {
  const note = useNote();

  const [steps, setSteps] = useState<number>(0);
  const {
    currentMonth,
    year: selectedYear,
    month: selectedDateOfMonth,
    day,
    theDay,
  } = getDate(new Date());
  const initialSelectedMonth = {
    month: selectedDateOfMonth,
    year: selectedYear,
    showDate: ``,
    day: "",
    date: 1,
    amount: "",
    remain: 0,
    monthId: "",
  };

  const [selectedMonth, setSelectedMonth] =
    useState<ExpendsProps>(initialSelectedMonth);

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
          day: Object.values(Day)[date.getDay()],
          date: date.getDate(),
        };
      }
    );
  }, [selectedMonth]);

  const onClose = () => {
    setSteps(0);
    setSelectedMonth(initialSelectedMonth);
    bottomSheetHandler("0%", true);
  };

  const onSubmit = () => {
    if (typeof selectedMonth.amount !== "number") {
      return;
    }
    onCreateExpend(selectedMonth);

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
    day: string;
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
    <div className={`${style.bottomSheet} `} id="bottomSheet">
      <div
        className="d-flex  border-bottom  p-2 "
        style={{
          width: "100%",
          justifyContent: "end",
        }}
      >
        <CloseButton onClick={onClose} />
      </div>

      <Dropdown
        data-bs-theme="dark"
        className={style.dropDown}
        style={{ display: "flex" }}
      >
        <Form.Label className="mt-3 fs-4">Choose a Month</Form.Label>
        <Dropdown.Toggle
          id="month"
          className={style.toggle}
          variant="secondary"
        >
          {steps > 1
            ? `${Months[selectedMonth.month]} / ${selectedMonth.year} `
            : "Choose Month"}
        </Dropdown.Toggle>

        <Dropdown.Menu className={style.toggle}>
          {note.purchases.map((purchase) => (
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
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown
        className={style.dropDown}
        style={{ display: steps > 1 ? "flex" : "none" }}
      >
        <Form.Label className="mt-3 fs-4">Choose a Day</Form.Label>
        <Stack className={` flex-row align-items-center `} gap={1}>
          <Dropdown.Toggle
            className={style.toggle}
            style={{ width: 322 }}
            id="day"
            variant="secondary"
          >
            {steps > 2 ? selectedMonth.showDate : "Choose a Day"}
          </Dropdown.Toggle>
          <SmallButton
            image={calender}
            variant="secondary"
            onClick={() =>
              chooseDayHandler({
                showDate: `${day}, ${Object.keys(Day)[theDay]}`,
                day: Object.values(Day)[theDay],
                date: day,
              })
            }
          />
        </Stack>

        <Dropdown.Menu
          className={style.toggle}
          style={{
            height: 300,
            overflowY: "scroll",
          }}
        >
          {dateList.map((date, index) => (
            <Dropdown.Item key={index} onClick={() => chooseDayHandler(date)}>
              {date.showDate}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Stack
        style={{ display: steps > 2 ? "flex" : "none" }}
        className={` flex-column align-items-center  fs-4 ${style.footer}`}
      >
        <Form.Group
          controlId="title"
          className="d-flex flex-column align-items-center mt-3 fs-4"
        >
          <Form.Label>Insert expends amount </Form.Label>
          <Form.Control
            isInvalid={(selectedMonth.amount as number) > selectedMonth.remain}
            required
            onChange={(e) =>
              setSelectedMonth((selected) => ({
                ...selected,
                amount: Number(e.target.value),
              }))
            }
            value={selectedMonth.amount}
            type="number"
            style={{
              width: 373,
              height: 44,
              padding: 0,
              textAlign: "center",
            }}
            //  placeholder={placeholder}
          />
        </Form.Group>

        <p className="mt-3 fs-4">Great! what to do now?</p>
        <div className="d-flex">
          {buttonsList.map((button, index) => (
            <BigButton
              key={index}
              onClick={button.onClick}
              variant={button?.color}
            >
              <Image src={button.image} width={20} height={20} />
            </BigButton>
          ))}
        </div>
      </Stack>
    </div>
  );
}

export default BottomSheetContent;
