import { Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";

function DailyRow() {
  return (
    <Stack
      direction="horizontal"
      className={`justify-content-between  p-3 ${style.monthContainer} ${style.dailyContainer} `}
    >
      <h5>day 15 ,Fri</h5>

      <h5>-60$</h5>
    </Stack>
  );
}

export default DailyRow;
