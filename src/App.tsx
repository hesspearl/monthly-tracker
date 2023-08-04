import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Toast } from "react-bootstrap";
import MonthlyList from "./components/monthlyList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalStorage } from "./hook/useLocalStorage";
import NoteLayout from "./components/monthlyPageLayout";
import MonthlyPurchase from "./components/monthpurchase";
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
  markdown: string;
  tagsIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    setNotes([
      {
        id: "0",
        title: "test",
        markdown: "",
        tagsIds: ["0"],
      },
    ]);

    setTags([
      {
        id: "0",
        label: "transport",
      },
    ]);
  }, []);

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
              // availableTags={tags}
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
      </Routes>
    </Container>
  );
}

export default App;
