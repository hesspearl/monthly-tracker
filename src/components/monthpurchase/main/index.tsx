import { useRef, useEffect } from "react";
import { MonthlyPurchaseProps } from "../index";
import { useTransaction } from "../../../hook/useTransaction";
import { Stack } from "react-bootstrap";
import MonthPurchaseHeader from "../header";
import MonthPurchaseBody from "../body/monthPurchaseBody";
import EditTagModal from "../header/EditTagModal";
import GalleryModal from "../header/galleryModal";
import ToggleButtons from "../toggleButtons";
import { Tag } from "../../../App";
import style from "../monthPurchase.module.css";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";

function MainMonthPurchase({
  selectedTags,
  setSelectedTags,
  onAddTag,
  availableTags,
  onUpdateTag,
  onDeleteTransactionTag,
  onUpdate,
}: MonthlyPurchaseProps) {
  const Transaction = useTransaction();
  const { isTotalValid } = useMonthPurchaseContext();
  useEffect(() => {
    if (isTotalValid) {
      window.scrollTo(0, 0);
    }
  }, [isTotalValid]);

  return (
    <Stack
      className={`d-flex justify-content-between  position-relative ${style.page} `}
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
  );
}

export default MainMonthPurchase;
