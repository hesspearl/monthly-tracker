import { Image, Stack } from "react-bootstrap";
import style from "./monthPurchase.module.css";
import edit from "../../assets/setting.svg";
function MonthlyRow({
  current,
  month,
  year,
  total,
  remain,
}: {
  current?: boolean;
  month: string;
  year: number;
  total: string;
  remain: string;
}) {
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
          width={35}
          height={35}
          className="position-absolute top-0 start-0"
        />
        <h5 className={`p-2 mt-2 ms-2`}>
          {month}/{year}
        </h5>
      </div>

      <div className={`pt-2 `}>
        <span>total:R${total}</span>
        <p>Remain:R${remain}</p>
      </div>
    </Stack>
  );
}

export default MonthlyRow;
