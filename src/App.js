import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { indexDBActionAction } from "./actions";
import { initializeSocket } from "./socket";
import { sortArray } from "./utils";
import CEElements from "./component/CEElements";
import PEElements from "./component/PEElements";

function App() {
  const data = useSelector((state) => state.data);
  const isLoaded = useSelector((state) => state.isLoaded);
  const dispatch = useDispatch();
  const values = Object.values(data);
  let ceTotal = 0,
    peTotal = 0;
  const ce = sortArray(
    values.filter((e) => e[1] !== 0 && e[2] > 0),
    false
  ).map((e) => {
    const [price, count, amount] = e;
    ceTotal += amount;
    return { price, count, amount, total: ceTotal };
  });
  const pe = sortArray(
    values.filter((e) => e[1] !== 0 && e[2] < 0),
    true
  ).map((e) => {
    const [price, count, amount] = e;
    const absAmt = Math.abs(amount);
    peTotal += absAmt;
    return { price, count, amount: absAmt, total: peTotal };
  });
  const fullTotal = ceTotal > peTotal ? ceTotal : peTotal;

  useEffect(() => {
    dispatch(indexDBActionAction({ type: "get" }));
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded) initializeSocket();
  }, [dispatch, isLoaded]);

  return (
    <div className="body">
      <div className="ceContainer">
        <div style={{ display: "flex" }}>
          <div className="count divStyle">COUNT</div>
          <div className="divStyle">AMOUNT</div>
          <div className="divStyle">TOTAL</div>
          <div className="divStyle">PRICE</div>
        </div>
        {ce.map((item) => {
          const { price, count, amount, total } = item;
          return (
            <CEElements
              price={price}
              count={count}
              amount={amount}
              total={total}
              fullTotal={fullTotal}
            />
          );
        })}
      </div>
      <div className="peContainer">
        <div style={{ display: "flex" }}>
          <div className="divStyle">PRICE</div>
          <div className="divStyle">TOTAL</div>
          <div className="divStyle">AMOUNT</div>
          <div className="count divStyle">COUNT</div>
        </div>
        {pe.map((item) => {
          const { price, count, amount, total } = item;
          return (
            <PEElements
              price={price}
              count={count}
              amount={amount}
              total={total}
              fullTotal={fullTotal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
