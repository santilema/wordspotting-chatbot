import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

const MainWrap = styled.div`
  .main {
    margin: 0 !important;
    padding: 0 !important;
  }

  .main-content {
    width: 100%;
    list-style: none;
    padding: 0 10px;
    margin: 0 !important;
    padding: 0 !important;
  }

  .main-content li:first-child {
    margin-top: .5rem;
  }

  .msg {
    padding: 5px 5px;
    
    width: auto;
    max-width: 60%;
    font-style: 1.1em;
    margin-bottom: 0.5rem;
  }
  .left {
    border-radius: 10px 10px 10px 0px;
    background-color: #edeced;
    text-align: left;
    margin-left: 0.5rem;
    margin-right: auto;
  }
  .right {
    border-radius: 10px 10px 0px 10px;
    background-color: #000066;
    color: white;
    width: auto !important;
    text-align: right;
    margin-left: auto;
    margin-right: 0.5rem;
  }
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
        <ul className="main-content">
          {messages.map((msg, i) => (
            <li className={`msg ${msg.position}`}>
              <span>{msg.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </MainWrap>
  );
}

export default Main