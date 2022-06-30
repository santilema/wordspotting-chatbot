import './App.css';
import Collector from './components/collector/collector';
import {useState, useEffect} from "react"
import socketIOClient from "socket.io-client";


const ENDPOINT = "http://localhost:3000";

function App() {
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([]);
  const [size, setSize] = useState(true)


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      console.log(data)
      setMessages([...messages, data]);
    });

    
  }, [])

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
