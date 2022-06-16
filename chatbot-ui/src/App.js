import './App.css';
import Collector from './components/collector/collector';
import { useState } from "react"

function App() {
    const [size, setSize] = useState(true)
    const handleClick = () => {
      setSize(!size)
    }
    
    return (
      <div className="app">
         <Collector size = {size} handleClick = {handleClick} />
      </div>
    );
}

export default App;
