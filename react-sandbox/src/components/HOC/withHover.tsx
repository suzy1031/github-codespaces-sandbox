import React, { useState } from "react";

export default function withHover<P>(Element: React.FC<P>) {
  return (props: P) => {
    const [hovering, setHover] = useState(false);

    return (
      <Element
        {...props}
        hovering={hovering}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    );
  };
}
