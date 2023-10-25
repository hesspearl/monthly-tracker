import { useOutletContext } from "react-router-dom";
import { Transaction } from "../App";

export const useTransaction = () => {
  return useOutletContext<Transaction>();
};
