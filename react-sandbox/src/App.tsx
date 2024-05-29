import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EnhancedDogImages from "./components/HOC/DogImage";

type WithStylesProps<P> = P & {
  style: React.CSSProperties;
};
function withStyles<P>(Component: React.FC<WithStylesProps<P>>) {
  return (props: P) => {
    const style = { padding: "0.2rem", margin: "1rem" };
    return <Component style={style} {...props} />;
  };
}

const Button = () => <button>Click me!</button>;
const Text = () => <p style={{ color: "black" }}>Hello world!</p>;

const StyledButton = withStyles(Button);
const StyledText = withStyles(Text);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <StyledButton />
        <StyledText />
        <EnhancedDogImages />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
