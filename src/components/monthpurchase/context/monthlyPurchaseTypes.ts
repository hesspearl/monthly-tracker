import { Dispatch } from "react";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import { Note, Purchase } from "../../../App";
import { PurchaseProps } from "../bottomSheets/bottomSheetMonthContent";

type BottomSheetTypes =
  | "edit-expend"
  | "delete-Expend"
  | "edit-month"
  | "delete-month";

export type MonthPurchaseStatesTypes = {
  editTitle: boolean;
  title: string;
  steps: number;
  openMonthPurchase: {
    id: string;
    open: boolean;
  };
  expendData: ExpendsProps;
  editTagsModalIsOpen: boolean;
  bottomSheetType: BottomSheetTypes;
  purchaseData: PurchaseProps;
};

export type MonthPurchaseActionTypes =
  | { type: "expendData"; data: ExpendsProps }
  | { type: "editTitle"; data: boolean }
  | { type: "title"; data: string }
  | { type: "steps"; data: number }
  | { type: "editTagsModalIsOpen"; data: boolean }
  | { type: "bottomSheetTypes"; data: BottomSheetTypes }
  | { type: "purchaseData"; data: PurchaseProps }
  | {
      type: "openMonthPurchase";
      data: {
        id: string;
        open: boolean;
      };
    };

type MonthPurchaseFunctionsTypes = {
  editTitleHandler: () => void;
  bottomSheetHandler: (height: string, close?: boolean) => void;
  daily: DailyProps;
  monthly: MonthlyProps;
};

export type MonthlyProps = {
  onOpenMonthClicked: (id: string) => void;
  onMonthBottomSheetClose: () => void;
  onCreatePurchase: (data: PurchaseProps) => void;
};

export type DailyProps = {
  onEditExpendBottomSheetClose: () => void;
  openEditExpendBottomSheet: () => void;
  onCreateExpend: (data: ExpendsProps) => void;
  onUpdateExpends: (data: ExpendsProps) => void;
  onDeleteExpendBottomSheetOpen: () => void;
  onDeleteExpendBottomSheetClose: () => void;
  onDeleteExpend: (data: ExpendsProps) => void;
};

export type MonthPurchaseContextProps = MonthPurchaseStatesTypes &
  MonthPurchaseFunctionsTypes & {
    dispatch: Dispatch<MonthPurchaseActionTypes>;
    note: Note;
  };
