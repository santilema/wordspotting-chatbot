import React from 'react'
import styled from 'styled-components'

const MainWrap = styled.div`
  .main{
    margin: 30px 0 0;
  }
  .messages{
      display: flex;
      align-items: center;
      justify-content: space-between;
  }


  .bot-messages {
      min-width: 60px;
      max-width: 50%;
      padding: 5px 7px;
      text-align: center;
      background-color: #EDECED;
      font-style: 1.1em;
      border-radius: 10px 10px 10px 0px;
      margin: 0 10px;
  }
  .human-messages{
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
  }
`

const Main = () => {
  return (
    <MainWrap>
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
    </MainWrap>
  );
}

export default Main