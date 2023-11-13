import { Dispatch, SetStateAction } from "react";
import { TransactionData, Tag } from "../../App";
import { MonthPurchaseContextProvider } from "./context/monthPurchaseProvider";
import MainMonthPurchase from "./main";

export interface MonthlyPurchaseProps {
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  onUpdate: (id: string, data: TransactionData) => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTransactionTag: (id: string, tagId: string) => void;
}

function MonthlyPurchase({
  selectedTags,
  setSelectedTags,
  onAddTag,
  availableTags,
  onUpdate,
  onUpdateTag,
  onDeleteTransactionTag,
}: MonthlyPurchaseProps) {
  return (
    <MonthPurchaseContextProvider {...{ onUpdate }}>
      <MainMonthPurchase
        {...{
          selectedTags,
          setSelectedTags,
          onAddTag,
          availableTags,
          onUpdate,
          onUpdateTag,
          onDeleteTransactionTag,
        }}
      />
    </MonthPurchaseContextProvider>
  );
}

export default MonthlyPurchase;
