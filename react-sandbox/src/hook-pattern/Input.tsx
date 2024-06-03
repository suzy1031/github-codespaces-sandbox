import React from "react";
import useKeyPress from "./useKeyPress";

export default function Input() {
  const [input, setInput] = React.useState("");
  const pressQ = useKeyPress("q");
  const pressW = useKeyPress("w");
  const pressL = useKeyPress("l");

  React.useEffect(() => {
    console.log("pressed Q!");
  }, [pressQ]);

  React.useEffect(() => {
    console.log("pressed W!");
  }, [pressW]);

  React.useEffect(() => {
    console.log("pressed L!");
  }, [pressL]);

  return (
    <input
      onChange={(e) => setInput(e.target.value)}
      value={input}
      placeholder="Type something..."
    />
  );
}
