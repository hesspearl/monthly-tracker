import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Toast } from "react-bootstrap";
import MonthlyList from "./components/monthlyList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalStorage } from "./hook/useLocalStorage";
import NoteLayout from "./components/monthlyPageLayout";
import MonthlyPurchase from "./components/monthpurchase";
import CreatePurchase from "./components/createPurchase";
import { v4 as uuidV4 } from "uuid";
import CreateNewPurchase from "./components/createNewPurchase";
import { Months } from "./utils/days";

interface StringValidator {
  isAcceptable(s: string): boolean;
}
const lettersRegexp = /^[A-Za-z]+$/;
class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type commonNoteData = {
  title: string;
  total: number;
  image: string;
  purchases: Purchase[];
};
export type RawNoteData = {
  tagsIds: string[];
} & commonNoteData;

export type NoteData = {
  tags: Tag[];
} & commonNoteData;

export type Purchase = {
  id: string;
  month: Months | string;
  year: number;
  total: number;
  remain: number;
  expends: {
    id: string;
    date: number;
    day: string;
    amount: number;
  }[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const onCreateNote = ({ ...data }: NoteData) => {
    setNotes((prevNotes) => [...prevNotes, { ...data, id: uuidV4() }]);
  };

  function onUpdate(id: string, { ...data }: NoteData): void {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data };
        } else {
          return note;
        }
      })
    );
  }
  const onUpdateTag = (id: string, label: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      })
    );
  };

  function onDeleteNoteTag(id: string, tagId: string): void {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
          };
        } else {
          return note;
        }
      })
    );
  }
  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
      })),
    [notes]
  );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MonthlyList
              availableTags={tags}
              notes={notesWithTags}
              onSubmit={onCreateNote}
              {...{ onAddTag, selectedTags, setSelectedTags }}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route
            index
            element={
              <MonthlyPurchase
                availableTags={tags}
                notes={notesWithTags}
                {...{
                  onAddTag,
                  selectedTags,
                  setSelectedTags,
                  onUpdateTag,
                  onUpdate,
                  onDeleteNoteTag,
                }}
              />
            }
          />
          <Route path="new" element={<CreateNewPurchase />} />
          {/* <Route
            path="edit"
            element={
              <EditNotes
                onSubmit={onUpdateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />  */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
