import { Dispatch } from "react";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import { Transaction } from "../../../App";
import { PurchaseProps } from "../bottomSheets/bottomSheetMonthContent";

type BottomSheetTypes =
  | "edit-expend"
  | "delete-Expend"
  | "edit-month"
  | "delete-month";

export type MonthPurchaseStatesTypes = {
  editTitle: boolean;
  title: string;
  image: string;
  steps: number;
  openMonthPurchase: {
    id: string;
    open: boolean;
  };
  expendData: ExpendsProps;
  editTagsModalIsOpen: boolean;
  bottomSheetType: BottomSheetTypes;
  purchaseData: PurchaseProps;
  openGallery: boolean;
};

export type MonthPurchaseActionTypes =
  | { type: "expendData"; data: ExpendsProps }
  | { type: "editTitle"; data: boolean }
  | { type: "openGallery"; data: boolean }
  | { type: "purchaseInfo"; data: { title: string; image: string } }
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
  editImageHandler: () => void;
};

export type MonthlyProps = {
  onOpenMonthClicked: (id: string) => void;
  onMonthBottomSheetOpen: () => void;
  onMonthBottomSheetClose: () => void;
  onCreatePurchase: (data: PurchaseProps) => void;
  onUpdatePurchase: (data: PurchaseProps) => void;
  onDeletePurchase: (id: string) => void;
};

export type DailyProps = {
  onEditExpendBottomSheetClose: () => void;
  openEditExpendBottomSheet: () => void;
  onDayBottomSheetOpen: () => void;
  onCreateExpend: (data: ExpendsProps) => void;
  onUpdateExpends: (data: ExpendsProps) => void;
  onDeleteExpendBottomSheetOpen: () => void;
  onDeleteExpendBottomSheetClose: () => void;
  onDeleteExpend: (data: ExpendsProps) => void;
};

export type MonthPurchaseContextProps = MonthPurchaseStatesTypes &
  MonthPurchaseFunctionsTypes & {
    dispatch: Dispatch<MonthPurchaseActionTypes>;
    transaction: Transaction;
  };
