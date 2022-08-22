import React, { useEffect } from "react";

import styled from "styled-components";
import {Logo, LogoText} from "../Logo";

export default function Footer() {
  return (
    <FooterDiv>
      <InnerBox>
        <Mainbox>
          {/* 로고 박스 */}
          <LogoBox>
            {/* 로고 Div */}
            <Logo />

            {/* 로고 텍스트 */}
            <LogoTextBox>
              <LogoText fontSize={"35px"} />
            </LogoTextBox>
          </LogoBox>

          {/* 링크 박스 */}
          <InfoBox>
            <ContentBox>
              <ContentTitle>Navigation</ContentTitle>
              <Content>About</Content>
            </ContentBox>
            <ContentBox>
              <ContentTitle>Contact</ContentTitle>
              <Content>Advertise</Content>
              <Content>FAQ</Content>
              <Content>Contact us</Content>
            </ContentBox>
            <ContentBox>
              <ContentTitle>SomeThing</ContentTitle>
            </ContentBox>
          </InfoBox>
        </Mainbox>
        <SocialBox>
          <SocialIconContainer>
            <i class="fab fa-instagram"></i>
          </SocialIconContainer>
          <SocialIconContainer>
            <i class="fab fa-facebook"></i>
          </SocialIconContainer>
          <SocialIconContainer>
            <i class="fab fa-twitter"></i>
          </SocialIconContainer>
          <SocialIconContainer>
            <i class="fab fa-youtube"></i>
          </SocialIconContainer>
          <SocialIconContainer>
            <i class="fab fa-reddit"></i>
          </SocialIconContainer>
        </SocialBox>
      </InnerBox>
    </FooterDiv>
  );
}

const FooterDiv = styled.div`
  width: 100%;
  //height: 24vh;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
`;

const InnerBox = styled.div`
  height: 100%;
  width: 85%;

  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`;

const Mainbox = styled.div`

  display: flex;
  //align-items: center;
  //background-color: beige;
`;

const LogoTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoBox = styled.div`
  width: 120px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const InfoBox = styled.div`
  margin-left: auto;
  display: flex;
  grid-gap: 1.5vw;
`;

const ContentBox = styled.div`
  width: 15vw;
  height: 100%;
  text-align: center;
  //background-color: aqua;
`;

const ContentTitle = styled.div`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.thin};
  color: ${({ theme }) => theme.colors.gray};
`;

const SocialBox = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-gap: 2vw;
  font-size: 35px;
`;

const SocialIconContainer = styled.a`
  color: inherit;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;