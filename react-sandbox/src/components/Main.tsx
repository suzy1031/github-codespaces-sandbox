import React from "react";

type Greet = "hello" | "goodbye" | "none";

type Props = {
  greet?: Greet;
};

export const Main: React.FC<Props> = ({ greet = "none" }) => {
  const componentsMap = {
    hello: <div style={{ color: "blue" }}>nice to meet to you!</div>,
    goodbye: <div style={{ color: "yellow" }}>good bye!!</div>,
    none: <div style={{ color: "red" }}>...??</div>,
  };

  const styleMap = {
    hello: { backgroundColor: "lightgreen" },
    goodbye: { backgroundColor: "lightcoral" },
    none: { backgroundColor: "lightgray" },
  };

  return (
    <div>
      <div style={styleMap[greet]}>{componentsMap[greet]}</div>
    </div>
  );
};
