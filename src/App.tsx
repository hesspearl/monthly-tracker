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

export type RawNoteData = {
  title: string;
  total: string;
  tagsIds: string[];
};

export type NoteData = {
  title: string;
  total: string;
  tags: Tag[];
  image: string;
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
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <MonthlyList
              availableTags={tags}
              notes={notesWithTags}
              {...{ selectedTags }}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route
            index
            element={
              <MonthlyPurchase
                availableTags={tags}
                {...{ onAddTag, selectedTags, setSelectedTags }}
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
        <Route
          path="/new"
          element={
            <CreatePurchase
              onSubmit={onCreateNote}
              {...{ onAddTag, selectedTags, setSelectedTags }}
              availableTags={tags}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
