import { getDate } from "../../../utils/days";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import {
  MonthPurchaseActionTypes,
  MonthPurchaseStatesTypes,
} from "./monthlyPurchaseTypes";

const {
  year: selectedYear,
  month: selectedDateOfMonth,
  currentMonth,
} = getDate;

export const initialExpendData: ExpendsProps = {
  month: selectedDateOfMonth,
  year: selectedYear,
  showDate: `1, Sunday`,
  day: ["SUN", "Sunday"] as [string, string],
  date: 1,
  amount: "",
  remain: 0,
  monthId: "",
};

export const initialPurchaseDate = {
  month: "",
  year: 0,
  remain: 0,
  total: 0,
  expends: [],
  date: undefined,
};

export const monthlyPurchaseInit: MonthPurchaseStatesTypes = {
  expendData: initialExpendData,
  purchaseData: initialPurchaseDate,
  editTitle: false,
  title: "",
  steps: 0,
  openMonthPurchase: { id: "", open: false },
  editTagsModalIsOpen: false,
  bottomSheetType: "edit-expend",
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

    case "title":
      return {
        ...state,
        title: action.data,
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
    default:
      break;
  }

  return state;
};
