import { createContext, useContext } from "react";
import { MonthPurchaseContextProps } from "./monthlyPurchaseTypes";

const MonthPurchaseContext = createContext<MonthPurchaseContextProps | null>(
  null
);

export const useMonthPurchaseContext = () => {
  const context = useContext(MonthPurchaseContext);

  if (!context) {
    throw new Error(
      "useMonthPurchaseContext is not within MonthPurchaseContext provider."
    );
  }

  return context;
};

export default MonthPurchaseContext;
