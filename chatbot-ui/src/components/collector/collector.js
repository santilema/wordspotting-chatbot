import React from 'react'
import Bottom from '../bottom/Bottom'
import Header from '../header/Header'
import Main from '../main/Main'
import { AiFillMessage as BotClosed, AiOutlineMessage as BotOpen } from "react-icons/ai";
import "./collector.css"

const Collector = ({handleClick, size}) => {
  return (
    <div className="collector">
      <div
        className="bot-body"
        style={{ visibility: size ? "visible" : "hidden" }}
      >
        <Header />
        <Main />
        <Bottom />
      </div>
      <div className="icon">
        <div className="bot-icon" onClick={handleClick}>
          {size ? (
            <BotOpen className="bot-btn" />
          ) : (
            <BotClosed className="bot-btn" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Collector