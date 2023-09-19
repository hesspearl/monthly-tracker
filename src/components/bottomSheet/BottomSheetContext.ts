import { createContext, useContext } from "react";
interface BottomSheetContextProps<T> {
  data: T;
  newFun: () => boolean;
}

const BottomSheetContext =
  createContext<BottomSheetContextProps<object> | null>(null);

const BottomSheetContextProvider = () => {
  const nefunc = () => true;
};

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error(
      "BottomSheet.* component must be rendered inside BottomSheet Component"
    );
  }

  return context;
};

export default BottomSheetContext;
