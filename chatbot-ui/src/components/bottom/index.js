import React from "react";
// import "./bottom.css";
import { RiSendPlaneFill as Send } from "react-icons/ri";
import styled from "styled-components";

const BottomWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;

  .bottom-body {
    display: flex;
    height: 3rem;
  }

  .input-wrap {
    flex: 3;
    display: flex;
    background-color: #fff;
    padding-left: 1rem;
    border-top: 1px solid #000066;
  }

  input {
    border: none;
    outline: none;
  }

  .btn {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #000066;
    color: white;
  }
  button {
    background: inherit;
    border: none;
    color: inherit;
    cursor: pointer;
  }
`;

const Bottom = () => {
  return (
    <BottomWrap>
      <div className="bottom-body">
        <div className="input-wrap">
          <input type="text" name="input" placeholder="Write your message" />
        </div>
        <div className="btn">
          <Send />
          <button>Send</button>
        </div>
      </div>
    </BottomWrap>
  );
};

export default Bottom;
