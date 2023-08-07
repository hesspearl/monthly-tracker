import PageTitle from "../pageTitle";
import { NoteData, Tag } from "../../App";
import FormInput from "../formInput";
import SelectTags, { SelectTagProps } from "../selectTags";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { images } from "../../utils/images";

export interface CreatePurchaseProps extends SelectTagProps {
  onSubmit: (data: NoteData) => void;
}

function CreatePurchase({
  onSubmit,
  onAddTag,
  availableTags,
  setSelectedTags,
  selectedTags,
}: CreatePurchaseProps) {
  const [data, setData] = useState<Omit<NoteData, "tags">>({
    title: "",
    total: "",
    image: images[0],
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Form
      onSubmit={() => {
        onSubmit({ ...data, tags: selectedTags }), navigate("..");
      }}
    >
      <PageTitle title="New Notes" withButtons button1="Back" linkTo="/" />
      <Image
        // key={index}
        src={data.image}
        role="button"
        width={200}
        height={200}
        onClick={() => setOpenModal(true)}
      />

      <FormInput
        label="Title"
        onChange={(e) =>
          setData((prev) => ({ ...prev, title: e.target.value }))
        }
        value={data.title}
      />
      <FormInput
        type="number"
        label="Total"
        onChange={(e) =>
          setData((prev) => ({ ...prev, total: e.target.value.toString() }))
        }
        value={data.total}
      />
      <SelectTags
        {...{ selectedTags, setSelectedTags, availableTags, onAddTag }}
      />
      <Button variant="success" type="submit">
        Submit
      </Button>
      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <Modal.Body>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              role="button"
              width={200}
              height={200}
              onClick={() => setData((prev) => ({ ...prev, image }))}
            />
          ))}
        </Modal.Body>
      </Modal>
    </Form>
  );
}

export default CreatePurchase;
