// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import { Main } from "./components/Main";
import { Sub } from "./components/Sub";
// import EnhancedDogImages from "./components/HOC/DogImage";
// // import Kelvin from "./components/render-prop-pattern/Kelvin";
// // import Fahrenheit from "./components/render-prop-pattern/Fahrenheit";
// // import Input from "./components/render-prop-pattern/Input";
// import Title from "./components/render-prop-pattern/Text";
// import { StyledButton, StyledText } from "./components/HOC/StyledParts";
// import Input from "../src/components/hook-pattern/Input";
// import ImageList from "../src/components/compound-component-pattern/Image";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
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
        <Title
          renderFirstComponent={() => (
            <h1>
              <span role="img" aria-label="emoji">
                ⭐️
              </span>
              I am a render props!!
              <span role="image" aria-label="emoji">
                ⭐️
              </span>
            </h1>
          )}
          renderSecondComponent={() => <h2>🔥 Second render prop! 🔥</h2>}
          renderThirdComponent={() => <h3>🚀 Third render prop! 🚀</h3>}
        />
        <Input
          render={(value) => (
            <>
              <Kelvin value={value} />
              <Fahrenheit value={value} />
            </>
          )}
        />
        <br />
        <Input />
        <ImageList />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <div>
        this is No.1: <Main greet="hello" />
        this is No.2: <Main greet="goodbye" />
        this is No.3: <Main />
      </div> */}
      <div>
        <p>this is No.1:</p> <Sub useResponsive visibleFooter />
        <p>this is No.2:</p> <Sub useResponsive visibleFooter={false} />
        <p>this is No.3:</p> <Sub useResponsive={false} />
      </div>
    </>
  );
}

export default App;
