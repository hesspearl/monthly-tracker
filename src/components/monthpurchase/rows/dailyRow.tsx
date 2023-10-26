import style from "../monthPurchase.module.css";
import { Expends, Purchase } from "../../../App";
import { SpringValue, animated, useSprings } from "@react-spring/web";
import { useGesture } from "react-use-gesture";
import edit from "../../../assets/pencil-alt.svg";
import bin from "../../../assets/trash-alt.svg";
import { Months } from "../../../utils/days";
import { useMonthPurchaseContext } from "../context/monthPurchaseContext";

export const left = {
  bg: `linear-gradient(to right , #0D6efd 0%,#0D6efd 50%, #f61d1d 50%, #f61d1d 100% )`,
  //
  justifySelf: "end",
};

interface DailyRowProps {
  expends: Expends[];

  monthPurchase: Purchase;
}

function DailyRow({
  expends,

  monthPurchase,
}: DailyRowProps) {
  const {
    daily: {
      openEditExpendBottomSheet,
      onEditExpendBottomSheetClose,
      onDeleteExpendBottomSheetOpen,
    },
    dispatch,
  } = useMonthPurchaseContext();
  const [props, api] = useSprings(expends.length, () => ({
    x: 0,
    display: "none",
    opacity: 0,
  }));

  const bind = useGesture({
    onDrag: ({ args: [index], movement: [x], cancel, direction: [xd] }) => {
      const selectedExpend = expends[index as number];
      const expendGeneralData = {
        monthId: monthPurchase.id,
        month: Number(Months[monthPurchase.month as Months]),
        amount: selectedExpend.amount,
        year: monthPurchase.year,
        day: selectedExpend.day,
        date: selectedExpend.date,
        showDate: `${selectedExpend.date}, ${selectedExpend.day[1]} `,
        remain: monthPurchase.remain,
        expendId: selectedExpend.id,
        total: monthPurchase.total,
      };
      if (xd == 1) {
        dispatch({
          type: "expendData",
          data: {
            ...expendGeneralData,
            previousAmount: selectedExpend.amount,
          },
        });
        dispatch({
          type: "purchaseData",
          data: {
            ...monthPurchase,
            monthId: monthPurchase.id,
            month: monthPurchase.month as string,
            sumAllExpendsAmounts: monthPurchase.expends.reduce(
              (total, value) => {
                return total + value.amount;
              },
              0
            ),
          },
        });
        openEditExpendBottomSheet();
      }

      if (xd == -1) {
        dispatch({
          type: "expendData",
          data: expendGeneralData,
        });
        onDeleteExpendBottomSheetOpen();
      }

      if (x > 100 || x < -100) return cancel();
      api.start((i) => ({
        x: index === i ? x : 0,
        display: index === i ? "flex" : "none",
        opacity: (x > 0 || x < 0) && index === i ? 1 : 0,
      }));
    },
    onDragEnd: (event) => {
      if (event.direction[0] == 0) {
        onEditExpendBottomSheetClose();
      }
    },
  });

  return (
    <>
      {props.map(({ x, display, opacity }, i) => {
        return (
          <animated.div
            key={expends[i].id}
            className={` ${style.monthContainer}`}
            style={{ background: left.bg, position: "relative", marginTop: 5 }}
          >
            <Image img={edit} direction="left" {...{ opacity, display }} />
            <Image img={bin} direction="right" {...{ opacity, display }} />

            <animated.div
              style={{ x }}
              {...bind(i)}
              className={` ${style.monthContainer} ${style.dailyContainer} `}
            >
              <h5>{`day ${expends[i].date} ,${expends[i].day[0]}`}</h5>

              <h5>{`-${expends[i].amount}$`}</h5>
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}

const Image = ({
  img,
  direction,
  display,
  opacity,
}: {
  img: string;
  direction: "left" | "right";
  display: SpringValue<string>;
  opacity: SpringValue<number>;
}) => (
  <animated.img
    src={img}
    style={{
      position: "absolute",
      top: 20,
      [direction]: 15,
      display,
      opacity,
    }}
  />
);
export default DailyRow;
