import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

const MainWrap = styled.div`
  .main {
    margin: 30px 0 0;
  }
  .messages {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .msg {
    min-width: 60px;
    max-width: 50%;
    padding: 5px 7px;
    text-align: center;
    
    font-style: 1.1em;
    margin: 0 10px;
  }
  .left {
    border-radius: 10px 10px 10px 0px;
    background-color: #edeced;
    text-align: left;
  }
  .right {
    border-radius: 10px 10px 0px 10px;
    background-color: #000066;
    color: white;
    text-align: right;
    width: auto !important;
  }
  /* .human-messages{
      min-width: 60px;
      max-width: 50%;
      padding: 5px;
      text-align: center;
      background-color: #000066;
      color: #EDECED;
      font-style: 1.1em;
      border-radius: 10px 10px 0 10px;
      margin: 0 10px;
      position: relative;
      top: 80px;
      margin-bottom: 20px;
  } */
`;

const Main = ({messages}) => {
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   //scroll to bottom when a message is sent or received
  //   if (messages.length > 1) {
  //     scrollToBottom();
  //   }
  // });

  // function scrollToBottom() {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // }
  return (
    <MainWrap>
      <div className="main">
        <ul className="main_content">
          {messages.map((msg, i) => (
            <li className={`msg ${msg.position}`}>{msg.text}</li>
          ))}
        </ul>
      </div>
    </MainWrap>
  );
}

export default Main