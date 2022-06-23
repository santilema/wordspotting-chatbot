import React from 'react'
import './main.css'

const Main = () => {
  return (
    <div>
      <div className="main">
        <div className="main_content">
          <div className="messages">
            <div className="bot-messages msg" id="message1">
              <span>Hello</span>
            </div>
            <div className="human-messages msg" id="message2">
              <span>Hello</span>
            </div>
            {/* <div className="bot-messages msg" >
              <span>Hello</span>
            </div>
            <div className="human-messages msg" >
              {/* <span>Hello</span> */}                    {/* will fix the issue in adding new msg soon */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main