import './App.css';
import Collector from './components/collector/collector';
import { useState, useEffect } from "react"
import io from "socket.io-react";

const socket = io.connect('hhtp://localhost:3000')

function App() {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([]);
  const [size, setSize] = useState(true)


  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username)
    })
  })
    const handleClick = () => {
      setSize(!size)
    }
    
    return (
      <div className="app" socket={socket}>
         <Collector size = {size} handleClick = {handleClick} />
      </div>
    );
}

export default App;
