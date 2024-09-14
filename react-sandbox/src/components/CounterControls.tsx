import { useDispatch } from "react-redux";
import { increment, decrement } from "../redux/store/index";

function CounterControls() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment({ value: 1 }))}>+1</button>
      <button onClick={() => dispatch(decrement({ value: 1 }))}>-1</button>
      <button onClick={() => dispatch(increment({ value: 2 }))}>+2</button>
      <button onClick={() => dispatch(decrement({ value: 2 }))}>-2</button>
    </div>
  );
}
export default CounterControls;
