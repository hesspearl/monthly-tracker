import { Image, Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";
import edit from "../../assets/setting.svg";
function MonthlyRow({ current }: { current?: boolean }) {
  return (
    <Stack
      direction="horizontal"
      className={` position-relative justify-content-between  px-3 ${
        current ? style.currentMonthContainer : style.monthContainer
      } `}
    >
      <div>
        <Image
          src={edit}
          role="button"
          className="position-absolute top-0 start-0"
        />
        <h5 className={`p-2 `}>June/2023</h5>
      </div>

      <div className={`pt-2 `}>
        <span>total:R$200</span>
        <p>Remain:R$100</p>
      </div>
    </Stack>
  );
}

export default MonthlyRow;
