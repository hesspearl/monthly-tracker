import { getDate } from "../../../utils/days";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import { PurchaseProps } from "../bottomSheets/bottomSheetMonthContent";
import {
  MonthPurchaseActionTypes,
  MonthPurchaseStatesTypes,
} from "./monthlyPurchaseTypes";

const { year: selectedYear, month: selectedDateOfMonth } = getDate;

export const initialExpendData: ExpendsProps = {
  month: selectedDateOfMonth,
  year: selectedYear,
  showDate: `1, Sunday`,
  day: ["SUN", "Sunday"] as [string, string],
  date: 1,
  amount: "",
  remain: 0,
  monthId: "",
  total: 0,
};

export const initialPurchaseDate: PurchaseProps = {
  month: "",
  year: 0,
  remain: 0,
  total: 0,
  expends: [],
  date: undefined,
  sumAllExpendsAmounts: 0,
};

export const monthlyPurchaseInit: MonthPurchaseStatesTypes = {
  expendData: initialExpendData,
  purchaseData: initialPurchaseDate,
  editTitle: false,
  title: "",
  image: "",
  steps: 0,
  openMonthPurchase: { id: "", open: false },
  editTagsModalIsOpen: false,
  bottomSheetType: "edit-expend",
  openGallery: false,
  isTotalValid: false,
};

export const monthlyPurchaseState = (
  state: MonthPurchaseStatesTypes,
  action: MonthPurchaseActionTypes
): MonthPurchaseStatesTypes => {
  switch (action.type) {
    case "editTitle":
      return {
        ...state,
        editTitle: action.data,
      };

    case "expendData":
      return {
        ...state,
        expendData: action.data,
      };

    case "openMonthPurchase":
      return {
        ...state,
        openMonthPurchase: action.data,
      };
    case "steps":
      return {
        ...state,
        steps: action.data,
      };

    case "purchaseInfo":
      return {
        ...state,
        title: action.data.title,
        image: action.data.image,
      };
    case "editTagsModalIsOpen":
      return {
        ...state,
        editTagsModalIsOpen: action.data,
      };
    case "bottomSheetTypes":
      return {
        ...state,
        bottomSheetType: action.data,
      };
    case "purchaseData":
      return {
        ...state,
        purchaseData: action.data,
      };
    case "openGallery":
      return {
        ...state,
        openGallery: action.data,
      };
    case "isTotalValid":
      return {
        ...state,
        isTotalValid: action.data,
      };
    default:
      break;
  }

  return state;
};
