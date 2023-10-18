import { ReactNode, useReducer } from "react";
import { useNote } from "../../../hook/useNote";
import { v4 as uuidV4 } from "uuid";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import { NoteData, Purchase } from "../../../App";
import MonthPurchaseContext from "./monthPurchaseContext";
import { DailyProps, MonthlyProps } from "./monthlyPurchaseTypes";
import {
  initialExpendData,
  monthlyPurchaseInit,
  monthlyPurchaseState,
} from "./monthlyPurchaseStates";
import { PurchaseProps } from "../bottomSheets/bottomSheetMonthContent";
import { Months } from "../../../utils/days";

export const MonthPurchaseContextProvider = ({
  children,
  onUpdate,
}: {
  children: ReactNode;
  onUpdate: (id: string, data: NoteData) => void;
}) => {
  const note = useNote();

  const [
    {
      editTitle,
      openMonthPurchase,
      steps,
      title,
      expendData,
      editTagsModalIsOpen,
      bottomSheetType,
      purchaseData,
      image,
      openGallery,
    },
    dispatch,
  ] = useReducer(monthlyPurchaseState, {
    ...monthlyPurchaseInit,
    title: note.title,
    image: note.image,
  });

  const editTitleHandler = () => {
    if (!editTitle) {
      dispatch({ type: "editTitle", data: true });

      return;
    }
    onUpdate(note.id, { ...note, title });
    dispatch({ type: "editTitle", data: false });
  };

  const editImageHandler = () => {
    // if (!editTitle) {
    //   dispatch({ type: "editTitle", data: true });

    //   return;
    // }
    onUpdate(note.id, { ...note, image });
    dispatch({ type: "openGallery", data: false });
  };
  const bottomSheetHandler = (height: string, close?: boolean) => {
    const bottomSheetElement = window.document.getElementById("bottomSheet");
    if (bottomSheetElement) {
      if (bottomSheetElement.style.height > height && height === "20%") return;
      if (close) {
        bottomSheetElement.style.height = height;
        bottomSheetElement.style.display = `none`;
        return;
      }
      bottomSheetElement.style.height = height;
      bottomSheetElement.style.display = `flex`;
    }
  };

  const onCreateExpend = (data: ExpendsProps) => {
    const updatedPurchases = note.purchases.map((purchase) => {
      if (data.monthId === purchase.id) {
        const amount = data.amount as number;
        if (purchase.remain < amount) return purchase;
        const updateMonthPurchase: Purchase = {
          ...purchase,
          remain: purchase.remain - amount,
          expends: [
            ...purchase.expends,
            {
              id: uuidV4(),
              date: data.date,
              day: data.day,
              amount,
            },
          ],
        };
        return updateMonthPurchase;
      } else return purchase;
    });
    onUpdate(note.id, { ...note, purchases: updatedPurchases });
  };

  const sortPurchase = (array: Purchase[]) => {
    return array.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      const month1 = +Months[a.month as Months];
      const month2 = +Months[b.month as Months];
      return month1 - month2;
    });
  };

  const onCreatePurchase = ({
    remain,
    total,
    month,
    year,
    expends,
    date,
  }: PurchaseProps) => {
    const updatedPurchase = [
      ...note.purchases,
      { id: uuidV4(), remain, total, month, year, expends, date: date! },
    ];

    sortPurchase(updatedPurchase);
    onUpdate(note.id, {
      ...note,
      purchases: updatedPurchase,
    });
  };

  const onUpdatePurchase = ({
    monthId,
    total,
    month,
    year,
    date,
  }: PurchaseProps) => {
    const updatedPurchase = note.purchases.map((purchase) =>
      purchase.id === monthId
        ? {
            ...purchase,
            total,
            month,
            year,
            date: date!,
          }
        : purchase
    );

    sortPurchase(updatedPurchase);
    onUpdate(note.id, {
      ...note,
      purchases: updatedPurchase,
    });
  };

  const onDeletePurchase = (monthId: string) => {
    const updatedPurchase = note.purchases.filter(
      (purchase) => purchase.id !== monthId
    );

    onUpdate(note.id, {
      ...note,
      purchases: updatedPurchase,
    });
  };

  const onUpdateExpends = (data: ExpendsProps) => {
    const updatedPurchases = note.purchases.map((purchase) => {
      if (data.monthId === purchase.id) {
        const amount = data.amount as number;
        if (purchase.remain < amount) return purchase;
        const updatedAmount = data.previousAmount
          ? amount === 0
            ? -data.previousAmount
            : amount - data.previousAmount
          : amount;

        const updateMonthPurchase: Purchase = {
          ...purchase,
          remain: purchase.remain - updatedAmount,
          expends: purchase.expends.map((expend) =>
            expend.id === data.expendId
              ? { ...expend, date: data.date, day: data.day, amount }
              : expend
          ),
        };
        return updateMonthPurchase;
      } else return purchase;
    });
    onUpdate(note.id, { ...note, purchases: updatedPurchases });
  };

  const onOpenMonthClicked = (id: string) => {
    if (id === openMonthPurchase.id) {
      dispatch({ type: "openMonthPurchase", data: { id: "", open: false } });

      return;
    }
    dispatch({ type: "openMonthPurchase", data: { id: id, open: true } });
  };

  const openEditExpendBottomSheet = () => {
    dispatch({ type: "bottomSheetTypes", data: "edit-expend" });
    dispatch({ type: "steps", data: 3 });
    bottomSheetHandler("75%", false);
  };

  const onEditExpendBottomSheetClose = () => {
    dispatch({ type: "bottomSheetTypes", data: "edit-expend" });
    dispatch({ type: "steps", data: 0 });
    dispatch({ type: "expendData", data: initialExpendData });
    bottomSheetHandler("0%", true);
  };

  const onDeleteExpendBottomSheetOpen = () => {
    dispatch({ type: "bottomSheetTypes", data: "delete-Expend" });
    bottomSheetHandler("35%", false);
  };

  const onDeleteExpendBottomSheetClose = () => {
    dispatch({ type: "bottomSheetTypes", data: "delete-Expend" });
    bottomSheetHandler("0%", true);
  };

  const onMonthBottomSheetClose = () => {
    dispatch({ type: "bottomSheetTypes", data: "edit-month" });
    bottomSheetHandler("0%", true);
  };
  const onDeleteExpend = (data: ExpendsProps) => {
    const updatedPurchases = note.purchases.map((purchase) => {
      if (data.monthId === purchase.id) {
        const amount = data.amount as number;

        const updateMonthPurchase: Purchase = {
          ...purchase,
          remain: purchase.remain + amount,
          expends: purchase.expends.filter(
            (expend) => expend.id !== data.expendId
          ),
        };
        return updateMonthPurchase;
      } else return purchase;
    });
    onUpdate(note.id, { ...note, purchases: updatedPurchases });
    onDeleteExpendBottomSheetClose();
    dispatch({ type: "expendData", data: initialExpendData });
  };

  const onMonthBottomSheetOpen = () => {
    dispatch({ type: "bottomSheetTypes", data: "edit-month" }),
      bottomSheetHandler("50%");
  };
  const monthly: MonthlyProps = {
    onOpenMonthClicked,
    onMonthBottomSheetOpen,
    onMonthBottomSheetClose,
    onCreatePurchase,
    onUpdatePurchase,
    onDeletePurchase,
  };

  const daily: DailyProps = {
    onEditExpendBottomSheetClose,
    openEditExpendBottomSheet,
    onCreateExpend,
    onUpdateExpends,
    onDeleteExpendBottomSheetOpen,
    onDeleteExpendBottomSheetClose,
    onDeleteExpend,
  };

  return (
    <MonthPurchaseContext.Provider
      value={{
        editImageHandler,
        openGallery,
        image,
        bottomSheetType,
        daily,
        monthly,
        bottomSheetHandler,
        dispatch,
        steps,
        title,
        expendData,
        editTitle,
        openMonthPurchase,
        editTitleHandler,
        note,
        editTagsModalIsOpen,
        purchaseData,
      }}
    >
      {children}
    </MonthPurchaseContext.Provider>
  );
};
