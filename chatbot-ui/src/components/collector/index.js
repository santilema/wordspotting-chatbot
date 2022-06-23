import React from 'react'
import Bottom from '../bottom'
import Header from '../header'
import Main from '../main'
import { AiFillMessage as BotClosed, AiOutlineMessage as BotOpen } from "react-icons/ai";
// import {BiBot} from 'react-icons/bi'
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
            <BotOpen className="bot-btn first" />
          ) : (
            <BotClosed className="bot-btn second" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Collector