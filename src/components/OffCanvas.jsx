import React, { useState }  from "react";
import { Link } from "react-router-dom";

import { useAccountState, useAccountDispatch } from "../context/AccountContext";
import styled, { css } from "styled-components";

export default function OffCanvas({ children }) {
  
  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();

  const [state, setState] = useState(true);
  const toggle = () => {
    console.log("ddd")
    setState(!state);
  };

  let content = <></>
  //로그인 되어 있으면 보여줄 요소
  if(accountState.isLogin) {
    content = (
      <>
        <MenuLink to={`/user/${accountState.username}`}>
          {accountState.username}
        </MenuLink>
        <MenuLink onClick={()=>{accountDispatch({ type: "LOGOUT" });}}>LOGOUT</MenuLink>
      </>
    );
  } else {
    //로그인 안 되어 있으면 보여줄 요소
    content = (
      <>
        <MenuLink to ="/signin" onClick={toggle}>
          LOGIN
        </MenuLink>
        <MenuLink to={`/signup`} onClick={toggle}>
          SIGN-UP
        </MenuLink>

      </>
    );
  }
  

  return (
    <>
      <Show onClick={toggle} />
      <Body active={state}>
        <div>
          <Close onClick={toggle} />
        </div>
        {content}
        <MenuLink to={`/signup`} onClick={toggle}>
          SEARCH
        </MenuLink>
        <MenuLink to={`/signup`} onClick={toggle}>
          ABOUT
        </MenuLink>
      </Body>
    </>
  );
}

const IconStyle = css`
  
  color: black;
  font-size: 30px;
  cursor: pointer;

  :hover {
    color: white;
  }
`;


const Show = styled.div`
  
  width: 40px;
  height: 40px;
  background-color: red;
`;

const Close = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  margin-right: 20px;
  margin-top: 15px;
  margin-left: 15px;
`;

const Body = styled.div`
  height: 100vh;
  width: 300px;
  position: fixed;
  background-color: #333;
  top: 0;
  right: ${(props) => (props.active ? "-300px" : "0px")};
  z-index: 100;

  transition: 0.3s;
  //background: ${(props) => (props.active ? "darkred" : "limegreen")};
`;

const MenuLink = styled(Link)`
  color: #bbbbbb;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  margin-left: 20px;
  :hover {
    color : ${({ theme }) => theme.colors.primary};
  }
`;
