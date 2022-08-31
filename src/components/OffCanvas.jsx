import React, { useState }  from "react";
import { Link } from "react-router-dom";

import { useAccountState, useAccountDispatch } from "../context/AccountContext";
import styled, { css } from "styled-components";
import BurgerMenu from "./elements/BurgerMenu";
import { NEWS_CATE } from "../const";

export default function OffCanvas({ children }) {
  
  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();

  const [state, setState] = useState(true);
  const toggle = () => {
    setState(!state);
  };

  const CateLink  = Object.keys(NEWS_CATE).map((key, index) => {
    return (
      <MenuLink onClick={toggle} to={`/cate/${key.toLowerCase()}`}>
        {key}
      </MenuLink>
    );
  });
        
  let content = <></>
  //로그인 되어 있으면 보여줄 요소
  if(accountState.isLogin) {
    content = (
      <>
        <MenuLink onClick={toggle} to={`/user/${accountState.userName}`}>
          {accountState.userName}
        </MenuLink>
        <MenuLink
          onClick={() => {
            accountDispatch({ type: "LOGOUT" });
          }}
        >
          LOGOUT
        </MenuLink>
      </>
    );
  } else {
    //로그인 안 되어 있으면 보여줄 요소
    content = (
      <>
        <MenuLink to="/signin" onClick={toggle}>
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
      <Show onClick={toggle}>
        <BurgerMenu />
      </Show>
      <Body active={state}>
        <div>
          <Close onClick={toggle}>
            <BurgerMenu />
          </Close>
        </div>
        {content}
        <Line />
        <MenuLink to={`/signup`} onClick={toggle}>
          SEARCH
        </MenuLink>
        <MenuLink to={`/signup`} onClick={toggle}>
          ABOUT
        </MenuLink>
        {CateLink}
      </Body>
    </>
  );
}

const Show = styled.div`
  
  width: 50px;
  height: 50px;
`;

const Close = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  margin-top: 15px;
  margin-left: 15px;

  text-align: center;
  font-size: 40px;
`;

const Body = styled.div`
  height: 100vh;
  width: 85vw;
  position: fixed;
  background-color: #333;
  top: 0;
  right: ${(props) => (props.active ? "-85vw" : "0px")};
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

const Line = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 20px;
`;
