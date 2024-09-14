import { useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state: { count: number }) => state.count);

  return (
    <div>
      <h2>Count: {count}</h2>
    </div>
  );
}
export default Counter;
