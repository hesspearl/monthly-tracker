import { Button, Modal, Stack } from "react-bootstrap";
import { MonthlyListProps } from "../../monthlyList";
import SelectTags, { SelectTagProps } from "../../selectTags";
import { Tag } from "../../../App";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../StaticDroppable";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";

interface EditTagModalProps
  extends Omit<MonthlyListProps, "Transactions" | "onSubmit">,
    SelectTagProps {
  expendTags: Tag[];
  onUpdateExpendTags: () => void;
  onUpdateExpendTagsOrder: (orderedTags: Tag[]) => void;
}

function EditTagModal({
  availableTags,
  onDeleteTag,
  setSelectedTags,
  selectedTags,
  onAddTag,
  expendTags,
  onUpdateExpendTags,
  onUpdateExpendTagsOrder,
}: EditTagModalProps) {
  const { editTagsModalIsOpen, dispatch } = useMonthPurchaseContext();
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const tags = [...expendTags];
    const [removed] = tags.splice(result.source.index, 1);
    tags.splice(result.destination?.index, 0, removed);

    onUpdateExpendTagsOrder(tags);
  };

  return (
    <Modal
      show={editTagsModalIsOpen}
      onHide={() => dispatch({ type: "editTagsModalIsOpen", data: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="droppable">
            {(droppableProvided) => (
              <Stack gap={2} ref={droppableProvided.innerRef}>
                {expendTags.map((tag, index) => (
                  <Draggable key={tag.id} draggableId={tag.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        className="border rounded d-flex  justify-content-between align-items-center px-2 "
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <p className="pt-2">{tag.label}</p>

                        <Button
                          variant="outline-danger"
                          onClick={() => onDeleteTag(tag.id)}
                        >
                          &Chi;
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
              </Stack>
            )}
          </StrictModeDroppable>
        </DragDropContext>
        <Stack className="mt-4">
          <SelectTags
            {...{
              selectedTags,
              setSelectedTags,
              onAddTag,
              availableTags: availableTags.filter((tag) =>
                expendTags?.every((exTag) => tag.id !== exTag.id)
              ),
            }}
          />
        </Stack>
        <Stack className="mt-4">
          <Button
            onClick={() => {
              onUpdateExpendTags(),
                dispatch({ type: "editTagsModalIsOpen", data: false }),
                setSelectedTags([]);
            }}
          >
            save
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default EditTagModal;
