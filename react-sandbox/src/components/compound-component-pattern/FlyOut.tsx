import React from "react";
import IconSVG from "./Icon";

// interface FlyOutProps {
//   children: React.ReactElement<{
//     open: boolean;
//     toggle: React.Dispatch<React.SetStateAction<boolean>>;
//   }>[];
// }

export function FlyOut(props: any) {
  const [open, toggle] = React.useState(false);

  return (
    <div className={`flyout`}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}

function Toggle({
  open,
  toggle,
}: {
  open: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <IconSVG />
    </div>
  );
}

function List({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }: { children: React.ReactNode }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
