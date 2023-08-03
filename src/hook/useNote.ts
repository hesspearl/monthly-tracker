import { useOutletContext } from "react-router-dom";
import { Note } from "../App";

export const useNote = () => {
  return useOutletContext<Note>();
};
