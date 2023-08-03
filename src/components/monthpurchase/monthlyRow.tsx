import { Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";

function MonthlyRow({ current }: { current?: boolean }) {
  return (
    <Stack
      direction="horizontal"
      className={`justify-content-between  px-3 ${
        current ? style.currentMonthContainer : style.monthContainer
      } `}
    >
      <h5>June/2023</h5>
      <div className={`pt-2 `}>
        <span>total:R$200</span>
        <p>Remain:R$100</p>
      </div>
    </Stack>
  );
}

export default MonthlyRow;
