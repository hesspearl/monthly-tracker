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
  total: string;
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
  month: string;
  year: number;
  total: string;
  remain: string;
  expends: {
    id: string;
    date: number;
    day: string;
    amount: number;
  }[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
    ]);
  };

  function onUpdate(id: string, { tags, ...data }: NoteData): void {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) };
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
            tagsIds: note.tagsIds.filter((tag) => tag !== tagId),
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
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      })),
    [notes, tags]
  );
  return (
    <Container className="mt-4">
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
        {/* <Route
          path="/new"
          element={
            <CreatePurchase
              onSubmit={onCreateNote}
              {...{ onAddTag, selectedTags, setSelectedTags }}
              availableTags={tags}
            />
          }
        /> */}
      </Routes>
    </Container>
  );
}

export default App;
