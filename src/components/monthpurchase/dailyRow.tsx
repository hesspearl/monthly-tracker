import { Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";
import { Expends } from "../../App";

function DailyRow(expend: Expends) {
  return (
    <Stack
      direction="horizontal"
      className={`justify-content-between  p-3 ${style.monthContainer} ${style.dailyContainer} `}
    >
      <h5>{`day ${expend.date} ,${expend.day}`}</h5>

      <h5>{`-${expend.amount}$`}</h5>
    </Stack>
  );
}

export default DailyRow;
