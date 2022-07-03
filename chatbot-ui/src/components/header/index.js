import React from "react";
import image from "../../assets/background_img.jpeg";
import styled from "styled-components";
import {GrClose as CloseIcon} from "react-icons/gr"


const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000066;

  .header {
    display: flex;
    align-items: center;
    letter-spacing: 0.3px;
    width: 100%;
    border-bottom: 1.3px solid gray;

    color: white;
    padding: 0.6rem 0.6rem;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .right {
    margin-left: 10px;
  }
  .name {
    font-weight: normal;
    font-size: 1.2em;
  }
  .status {
    font-weight: 500;
    color: #615a93;
  }
  .exit-icon {
    padding: 2rem;
    color: white;

    .icon {
      font-size: 2rem;
      color: white !important;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrap>
      <div className="header">
        <div className="img">
          <img src={image} alt="background" />
        </div>
        <div className="right">
          <div className="name">Chatbot</div>
          <div className="status">Active</div>
        </div>
      </div>
      <div className="exit-icon">
        <CloseIcon className="icon"/>
      </div>
    </HeaderWrap>
  );
};

export default Header;
