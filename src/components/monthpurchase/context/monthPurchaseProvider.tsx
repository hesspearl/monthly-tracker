import { ReactNode, useReducer } from "react";
import { useTransaction } from "../../../hook/useTransaction";
import { v4 as uuidV4 } from "uuid";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import { TransactionData, Purchase } from "../../../App";
import MonthPurchaseContext from "./monthPurchaseContext";
import { DailyProps, MonthlyProps } from "./monthlyPurchaseTypes";
import {
  initialExpendData,
  initialPurchaseDate,
  monthlyPurchaseInit,
  monthlyPurchaseState,
} from "./monthlyPurchaseStates";
import { PurchaseProps } from "../bottomSheets/bottomSheetMonthContent";
import { Months } from "../../../utils/days";
import {
  DayBottomSheetHights,
  DeleteBottomSheetHight,
  MonthBottomSheetHight,
} from "../bottomSheets/bottomSheetHight";

export const MonthPurchaseContextProvider = ({
  children,
  onUpdate,
}: {
  children: ReactNode;
  onUpdate: (id: string, data: TransactionData) => void;
}) => {
  const transaction = useTransaction();

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
      isTotalValid,
    },
    dispatch,
  ] = useReducer(monthlyPurchaseState, {
    ...monthlyPurchaseInit,
    title: transaction.title,
    image: transaction.image,
  });

  const editTitleHandler = () => {
    if (!editTitle) {
      dispatch({ type: "editTitle", data: true });

      return;
    }
    onUpdate(transaction.id, { ...transaction, title });
    dispatch({ type: "editTitle", data: false });
  };

  const editImageHandler = () => {
    // if (!editTitle) {
    //   dispatch({ type: "editTitle", data: true });

    //   return;
    // }
    onUpdate(transaction.id, { ...transaction, image });
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
    const updatedPurchases = transaction.purchases.map((purchase) => {
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
              title: data.title,
            },
          ],
        };
        return updateMonthPurchase;
      } else return purchase;
    });
    onUpdate(transaction.id, { ...transaction, purchases: updatedPurchases });
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
      ...transaction.purchases,
      { id: uuidV4(), remain, total, month, year, expends, date: date! },
    ];

    sortPurchase(updatedPurchase);
    onUpdate(transaction.id, {
      ...transaction,
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
    const updatedPurchase = transaction.purchases.map((purchase) => {
      if (purchase.id === monthId) {
        const totalDifferent = purchase.total - total;

        return {
          ...purchase,
          remain: purchase.remain - totalDifferent,
          total,
          month,
          year,
          date: date!,
        };
      }
      return purchase;
    });

    sortPurchase(updatedPurchase);
    onUpdate(transaction.id, {
      ...transaction,
      purchases: updatedPurchase,
    });
  };

  const onDeletePurchase = (monthId: string) => {
    const updatedPurchase = transaction.purchases.filter(
      (purchase) => purchase.id !== monthId
    );

    onMonthBottomSheetClose();
    dispatch({ type: "purchaseData", data: initialPurchaseDate });
    onUpdate(transaction.id, {
      ...transaction,
      purchases: updatedPurchase,
    });
  };

  const onDayBottomSheetOpen = () => {
    dispatch({
      type: "openMonthPurchase",
      data: { id: "", open: false },
    }),
      dispatch({ type: "bottomSheetTypes", data: "edit-expend" }),
      bottomSheetHandler(DayBottomSheetHights.MIN_HEIGHT);
  };
  const onUpdateExpends = (data: ExpendsProps) => {
    const updatedPurchases = transaction.purchases.map((purchase) => {
      if (data.monthId === purchase.id) {
        const amount = data.amount as number;

        if (purchase.total < amount) return purchase;
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
              ? {
                  ...expend,
                  date: data.date,
                  day: data.day,
                  amount,
                  title: data.title,
                }
              : expend
          ),
        };
        return updateMonthPurchase;
      } else return purchase;
    });
    onUpdate(transaction.id, { ...transaction, purchases: updatedPurchases });
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
    bottomSheetHandler(DayBottomSheetHights.MAX_HEIGHT, false);
  };

  const onEditExpendBottomSheetClose = () => {
    dispatch({ type: "bottomSheetTypes", data: "edit-expend" });
    dispatch({ type: "steps", data: 0 });
    dispatch({ type: "expendData", data: initialExpendData });
    dispatch({ type: "purchaseData", data: initialPurchaseDate });
    bottomSheetHandler("0%", true);
  };

  const onDeleteExpendBottomSheetOpen = () => {
    dispatch({ type: "bottomSheetTypes", data: "delete-Expend" });
    bottomSheetHandler(DeleteBottomSheetHight, false);
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
    const updatedPurchases = transaction.purchases.map((purchase) => {
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
    onUpdate(transaction.id, { ...transaction, purchases: updatedPurchases });
    onDeleteExpendBottomSheetClose();
    dispatch({ type: "expendData", data: initialExpendData });
    dispatch({ type: "purchaseData", data: initialPurchaseDate });
  };

  const onMonthBottomSheetOpen = () => {
    dispatch({ type: "bottomSheetTypes", data: "edit-month" }),
      bottomSheetHandler(MonthBottomSheetHight);
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
    onDayBottomSheetOpen,
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
        transaction,
        editTagsModalIsOpen,
        purchaseData,
        isTotalValid,
      }}
    >
      {children}
    </MonthPurchaseContext.Provider>
  );
};
