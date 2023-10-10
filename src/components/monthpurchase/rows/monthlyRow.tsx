import { Image, Stack } from "react-bootstrap";
import style from "../monthPurchase.module.css";
import edit from "../../../assets/setting.svg";
import { Months } from "../../../utils/days";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";
function MonthlyRow({
  current,
  month,
  year,
  total,
  remain,
  onMonthClick,
  id,
  date,
}: {
  current?: boolean;
  month: string;
  year: number;
  total: number;
  remain: number;
  onMonthClick: () => void;
  id: string;
  date: Date;
}) {
  const {
    dispatch,
    purchaseData,
    monthly: { onMonthBottomSheetOpen },
  } = useMonthPurchaseContext();

  const onEdit = () => {
    dispatch({
      type: "purchaseData",
      data: {
        ...purchaseData,
        monthId: id,
        total,
        year,
        month,
        remain,
        date: new Date(date),
      },
    });
    onMonthBottomSheetOpen();
  };

  return (
    <div className={` position-relative mb-1 `}>
      <Image
        src={edit}
        role="button"
        width={35}
        height={35}
        className="position-absolute top-0 start-0"
        style={{ zIndex: 1 }}
        onClick={onEdit}
      />
      <Stack
        onClick={onMonthClick}
        direction="horizontal"
        className={` position-relative justify-content-between  px-3 ${
          current ? style.currentMonthContainer : style.monthContainer
        } `}
      >
        <div>
          <h5 className={`p-2 mt-2 ms-2`}>
            {month}/{year}
          </h5>
        </div>

        <div className={`pt-2 `}>
          <span>total:R${total}</span>
          <p>Remain:R${remain}</p>
        </div>
      </Stack>
    </div>
  );
}

export default MonthlyRow;
