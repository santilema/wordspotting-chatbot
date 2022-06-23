// import "./App.css";
import Collector from "./components/collector";
import Info from "./components/info";
import { useState } from "react";
import styled from "styled-components";
import bgImage from "./assets/main_background.png";

const AppWrapp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: end;
  align-items: end;
  background-image: url("${bgImage}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;

function App() {
  const [size, setSize] = useState(false);
  const handleClick = () => {
    setSize(!size);
  };

  return (
    <AppWrapp>
      <Info />
      <Collector size={size} handleClick={handleClick} />
    </AppWrapp>
  );
}

export default App;
