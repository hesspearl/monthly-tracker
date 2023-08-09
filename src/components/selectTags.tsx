import CreatableReactSelect from "react-select/creatable";
import { Dispatch, SetStateAction } from "react";
import { Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

export interface SelectTagProps {
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  selectedTags: Tag[];
}

function SelectTags({
  setSelectedTags,
  selectedTags,
  onAddTag,
  availableTags,
  ...props
}: SelectTagProps) {
  return (
    <CreatableReactSelect
      {...props}
      isMulti
      options={availableTags.map((tag) => ({
        label: tag.label,
        value: tag.id,
      }))}
      onCreateOption={(label) => {
        const newTag = { id: uuidV4(), label };

        onAddTag(newTag);
        setSelectedTags((prev) => [...prev, newTag]);
      }}
      value={selectedTags.map((tag) => ({
        label: tag.label,
        value: tag.id,
      }))}
      onChange={(selectedTags) => {
        setSelectedTags(
          selectedTags.map((tag) => ({
            label: tag.label,
            id: tag.value,
          }))
        );
      }}
    />
  );
}

export default SelectTags;
