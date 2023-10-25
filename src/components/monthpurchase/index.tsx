import { Dispatch, SetStateAction } from "react";
import { Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";
import EditTagModal from "./header/EditTagModal";
import { Transaction, TransactionData, Tag } from "../../App";
import { MonthPurchaseContextProvider } from "./context/monthPurchaseProvider";
import MonthPurchaseHeader from "./header";
import MonthPurchaseBody from "./body/monthPurchaseBody";
import { useTransaction } from "../../hook/useTransaction";
import ToggleButtons from "./toggleButtons";
import GalleryModal from "./header/galleryModal";

interface MonthlyPurchaseProps {
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
  const Transaction = useTransaction();

  return (
    <MonthPurchaseContextProvider {...{ onUpdate }}>
      <Stack
        className={`d-flex justify-content-between  position-relative ${style.page} `}
        // onClick={() => api.set({ x: 0 })}
      >
        <MonthPurchaseHeader />

        <MonthPurchaseBody />
        <EditTagModal
          {...{ selectedTags, setSelectedTags, onAddTag, onUpdateTag }}
          expendTags={Transaction.tags}
          availableTags={availableTags}
          onDeleteTag={(id) => onDeleteTransactionTag(Transaction.id, id)}
          onUpdateExpendTags={() =>
            onUpdate(Transaction.id, {
              ...Transaction,
              tagsIds: [
                ...Transaction.tagsIds,
                ...selectedTags.map((tag) => tag.id),
              ],
            })
          }
          onUpdateExpendTagsOrder={(orderedTags: Tag[]) => {
            onUpdate(Transaction.id, { ...Transaction, tags: orderedTags });
          }}
        />
        <GalleryModal />
        <ToggleButtons />
      </Stack>
    </MonthPurchaseContextProvider>
  );
}

export default MonthlyPurchase;
