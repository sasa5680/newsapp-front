import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { LogoText, Logo } from "../Logo";
import { useAccountState, useAccountDispatch } from "../../context/AccountContext"
import OffCanvas from "../OffCanvas";

export default function Header() {

  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();

  const onLogout = () => accountDispatch({ type: "LOGOUT" });

  let point = useMediaQuery({ query: "(max-width: 900px)"});
    
  return (
    <HeaderBox>
      {/* 로고 */}
      <MenuLink to={`/`}>
        <LogoBox>
          <LogoImageBox>
            <Logo />
          </LogoImageBox>
          <LogoTextBox>
            <LogoText />
          </LogoTextBox>
        </LogoBox>
      </MenuLink>
      {/* 메뉴 리스트 */}
      {!point ? (
        <>
          <MenuBox>
            <MenuItem>
              <MenuLink to={`/cate/science`}>SCIENCE</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to={`/cate/economy`}>ECONOMY</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to={`/cate/world`}>WORLD</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to={`/cate/tech`}>TECH</MenuLink>
            </MenuItem>
            {accountState.userRole === "ADMIN" && (
              <MenuItem>
                <MenuLink to={`/admin`}>ADMIN</MenuLink>
              </MenuItem>
            )}
          </MenuBox>
          {/* 오른쪽 메뉴박스 */}
          <MenuBoxRight>
            {accountState.isLogin ? (
              <>
                <MenuItem>
                  <MenuLink to={`/edit`}>
                    Write
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink to={`/user/${accountState.userName}`}>
                    {accountState.userName}
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    LOGOUT
                  </MenuLink>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <MenuLink to={`/signin`}>SIGN IN</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink to={`/signup`}>SIGN UP</MenuLink>
                </MenuItem>
              </>
            )}

            <MenuItem>
              <MenuLink to={`/search`}>search</MenuLink>
            </MenuItem>
          </MenuBoxRight>
        </>
      ) : (
        /* 모바일 시 보여주는 OffCanvas */
        <OffCanvasBox>
          <OffCanvas />
        </OffCanvasBox>
      )}
    </HeaderBox>
  );
}

const HeaderBox = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
  background-color: black;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  position: sticky;
  top: 0px;
  z-index: 10;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  height: 100%;
  width: 200px;
`;

const LogoImageBox = styled.div`
  width: 30%;
`
const LogoTextBox = styled.div`
  margin-left: 10px;
`

const MenuBox = styled.div`
    height: 100%;
    margin-left: 20px;
    display: flex;
`

const MenuItem = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  color: #bbbbbb;
  font-weight: 500;

  & :hover {
    color: ${({ theme }) => theme.colors.primary};
    transition: 0.2s;
  }
`;

const MenuLink = styled(Link)`
  color: white;
  font-weight: 500;
  text-decoration: none;
`;

const MenuBoxRight = styled.div`
  margin-right: 50px;
  height: 100%;
  margin-left: auto;
  display: flex;
`;

const OffCanvasBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
`