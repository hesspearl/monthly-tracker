import { Dispatch, SetStateAction } from "react";
import { Modal, Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";
import EditTagModal from "./header/EditTagModal";
import { Note, NoteData, Purchase, Tag } from "../../App";
import { MonthPurchaseContextProvider } from "./context/monthPurchaseProvider";
import MonthPurchaseHeader from "./header";
import MonthPurchaseBody from "./body/monthPurchaseBody";
import { useNote } from "../../hook/useNote";
import ToggleButtons from "./toggleButtons";
import GalleryModal from "./header/galleryModal";

interface MonthlyPurchaseProps {
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  notes: Note[];
  onUpdate: (id: string, data: NoteData) => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteNoteTag: (id: string, tagId: string) => void;
}

function MonthlyPurchase({
  selectedTags,
  setSelectedTags,
  onAddTag,
  availableTags,
  onUpdate,
  onUpdateTag,
  onDeleteNoteTag,
}: MonthlyPurchaseProps) {
  const note = useNote();

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
          expendTags={note.tags}
          availableTags={availableTags}
          onDeleteTag={(id) => onDeleteNoteTag(note.id, id)}
          onUpdateExpendTags={() =>
            onUpdate(note.id, {
              ...note,
              tagsIds: [...note.tagsIds, ...selectedTags.map((tag) => tag.id)],
            })
          }
          onUpdateExpendTagsOrder={(orderedTags: Tag[]) => {
            onUpdate(note.id, { ...note, tags: orderedTags });
          }}
        />
        <GalleryModal />
        <ToggleButtons />
      </Stack>
    </MonthPurchaseContextProvider>
  );
}

export default MonthlyPurchase;
