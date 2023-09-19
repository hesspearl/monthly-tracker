import { getDate } from "../../../utils/days";
import { ExpendsProps } from "../bottomSheets/bottomSheetContent";
import {
  MonthPurchaseActionTypes,
  MonthPurchaseStatesTypes,
} from "./monthlyPurchaseTypes";

const { year: selectedYear, month: selectedDateOfMonth } = getDate(new Date());

export const initialSelectedMonth: ExpendsProps = {
  month: selectedDateOfMonth,
  year: selectedYear,
  showDate: `1, Sunday`,
  day: ["SUN", "Sunday"] as [string, string],
  date: 1,
  amount: "",
  remain: 0,
  monthId: "",
};

export const monthlyPurchaseInit: MonthPurchaseStatesTypes = {
  selectedMonth: initialSelectedMonth,
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

    case "selectedMonth":
      return {
        ...state,
        selectedMonth: action.data,
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
    default:
      break;
  }

  return state;
};
