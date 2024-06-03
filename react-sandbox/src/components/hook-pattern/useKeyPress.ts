import React from "react";

function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleDown({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return keyPressed;
}
export default useKeyPress;
