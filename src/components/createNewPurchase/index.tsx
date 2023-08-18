import { useState } from "react";
import FormInput from "../formInput";
//import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import { Day, Months, getDate } from "../../utils/days";
import { Button, Form, Stack } from "react-bootstrap";
import PageTitle from "../pageTitle";
import { useLocation, useParams } from "react-router-dom";
import { useNote } from "../../hook/useNote";

type ValuePiece = Date;

type Value = ValuePiece;

function CreateNewPurchase() {
  const note = useNote();
  const [value, onChange] = useState<Value>(new Date());
  const [money, setMoney] = useState(() => ({
    amount: 20,
    total: note.total,
  }));
  const { theDay, day: date, month, year } = getDate(value);
  console.log({ day: Day[theDay], date, theMonth: Months[month], year, note });

  const onSaveClick = () => {
    note.purchases.map((puchase) => {
      if (puchase.year === year) {
        if (puchase.month === Months[month]) {
          return {
            ...puchase,
            total: money.total,
            remain: money.total - money.amount,
            expends: [
              ...puchase.expends,
              {
                date,
                day: theDay,
                amount: "",
              },
            ],
          };
        } else {
          return {
            id: "",
            month: Months[month],
            year,
            total: "",
            remain: "",
            expends: [
              ...puchase.expends,
              {
                date,
                day: theDay,
                amount: "",
              },
            ],
          };
        }
      } else {
        return puchase;
      }
    });
  };
  return (
    <Form onSubmit={onSaveClick}>
      <PageTitle title={`Edit  : ${note.title}`} />
      <PageTitle title={`Total : $${note.total}`} />
      <Stack gap={5} className=" align-items-center justify-content-center">
        {/* <Calendar
          onClickMonth={(value) => console.log(value)}
          onChange={(value) => onChange(value as ValuePiece)}
          value={value}
        /> */}
        {/* <FormInput
          label="Total"
          placeholder="Total"
          type="number"
          inputMaxWidth={"50%"}
          //   onChange={(e) =>
          //     setData((prev) => ({ ...prev, title: e.target.value }))
          //   }
          value={money.total}
        /> */}
        <FormInput
          label="Amount"
          placeholder="Amount"
          type="number"
          inputMaxWidth={"50%"}
          //   onChange={(e) =>
          //     setData((prev) => ({ ...prev, title: e.target.value }))
          //   }
          value={money.amount}
        />
        <Button type="submit" variant="success">
          Save
        </Button>
      </Stack>
    </Form>
  );
}

export default CreateNewPurchase;
