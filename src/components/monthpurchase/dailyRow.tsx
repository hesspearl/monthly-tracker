import style from "./monthPurchase.module.css";
import { Expends } from "../../App";
import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import edit from "../../assets/setting.svg";
import { Image } from "react-bootstrap";

export const left = {
  bg: `linear-gradient(to right , #0D6efd 0%,#0D6efd 50%, #f61d1d 50%, #f61d1d 100% )`,
  //
  justifySelf: "end",
};

interface DailyRowProps {
  expends: Expends[];
}

function DailyRow({ expends }: DailyRowProps) {
  const [props, api] = useSprings(expends.length, (i) => ({
    x: 0,
    display: "none",
    opacity: 0,
  }));

  const bind = useDrag(
    ({ args: [index], movement: [x], cancel, active, lastOffset }) => {
      console.log({ active, x });
      if (x > 100 || x < -100) return cancel();
      api.start((i) => {
        return {
          x: index === i ? x : 0,
          display: index === i ? "flex" : "none",
          opacity: (x > 0 || x < 0) && index === i ? 1 : 0,
        };
      });
    }
  );

  return (
    <>
      {props.map(({ x, display, opacity }, i) => {
        return (
          <animated.div
            key={expends[i].id}
            className={` ${style.monthContainer}`}
            style={{ background: left.bg, position: "relative" }}
          >
            <animated.img
              src={edit}
              style={{
                position: "absolute",
                top: 13,
                left: 10,
                display,
                opacity,
              }}
            />
            <animated.img
              src={edit}
              style={{
                position: "absolute",
                top: 13,
                right: 10,
                display,
                opacity,
              }}
            />
            <animated.div
              style={{ x }}
              {...bind(i)}
              className={` ${style.monthContainer} ${style.dailyContainer} `}
            >
              <h5>{`day ${expends[i].date} ,${expends[i].day}`}</h5>

              <h5>{`-${expends[i].amount}$`}</h5>
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}

export default DailyRow;
