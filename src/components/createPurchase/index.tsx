import PageTitle from "../pageTitle";
import { NoteData, RawNoteData, Tag } from "../../App";
import FormInput from "../formInput";
import SelectTags, { SelectTagProps } from "../selectTags";
import { Button, Form, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { images } from "../../utils/images";
import { v4 as uuidV4 } from "uuid";
import { getDate } from "../../utils/days";

export interface CreatePurchaseProps extends SelectTagProps {
  onSubmit: (data: RawNoteData) => void;
}

function CreatePurchase({
  onSubmit,
  onAddTag,
  availableTags,
  setSelectedTags,
  selectedTags,
}: CreatePurchaseProps) {
  const [data, setData] = useState<Omit<RawNoteData, "tagsIds">>({
    title: "",
    total: 0,
    image: images[0],
    purchases: [],
  });
  const { year, currentMonth, month, day } = getDate;

  const navigate = useNavigate();
  const dateFormat = new Date(`${month + 1}-${day}-${year}`);

  const onChangeTotal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const total = Number(e.target.value);
    setData((prev) => ({
      ...prev,
      total,
      purchases: [
        {
          id: uuidV4(),
          month: currentMonth,
          year,
          total,
          remain: total,
          expends: [],
          date: new Date(dateFormat.toString()),
        },
      ],
    }));
  };

  return (
    <Form
      onSubmit={() => {
        onSubmit({ ...data, tagsIds: selectedTags.map((tag) => tag.id) }),
          navigate("..");
      }}
      className="d-flex flex-column align-items-center "
    >
      <Stack gap={4} className="d-flex flex-column align-items-center">
        {/* <Image
        // key={index}
        src={data.image}
        role="button"
        width={200}
        height={200}
        onClick={() => setOpenModal(true)}
      /> */}

        <FormInput
          label="Title"
          placeholder="Title"
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
          value={data.title}
        />
        <FormInput
          type="number"
          placeholder="Total"
          label="Total"
          onChange={onChangeTotal}
          value={data.total.toString()}
        />
        <Stack className="d-flex flex-column align-items-center">
          <div style={{ width: 350 }}>
            <SelectTags
              {...{
                selectedTags,
                setSelectedTags,
                availableTags,
                onAddTag,
                placeholder: "Select tag",
              }}
            />
          </div>
        </Stack>

        <Stack className="d-flex flex-wrap flex-row " gap={2}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              role="button"
              width={130}
              height={130}
              onClick={() => setData((prev) => ({ ...prev, image }))}
              className={`border ${
                data.image === image ? ` border-2 border-primary` : `border`
              } `}
            />
          ))}
        </Stack>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
}

export default CreatePurchase;
