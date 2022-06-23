import "./App.css";
import Collector from "./components/collector";
import Info from "./components/info";
import { useState } from "react";

function App() {
  const [size, setSize] = useState(false);
  const handleClick = () => {
    setSize(!size);
  };

  return (
    <div className="app">
      <Info />
      <Collector size={size} handleClick={handleClick} />
    </div>
  );
}

export default App;
