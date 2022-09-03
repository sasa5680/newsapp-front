import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {Logo, LogoText} from "../Logo";

export default function Footer() {

  const histroy = useHistory();

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
              <LogoText fontSize={"30px"} />
            </LogoTextBox>
          </LogoBox>

          {/* 링크 박스 */}
          <InfoBox>
            <ContentBox>
              <ContentTitle>Navigation</ContentTitle>
              <Content onClick={() => histroy.push("/")}>
                Main
              </Content>
              <Content onClick={() => histroy.push("/cate/world")}>
                World
              </Content>
              <Content onClick={() => histroy.push("/cate/science")}>
                Science
              </Content>
              <Content onClick={() => histroy.push("/cate/economy")}>
                Economy
              </Content>
              <Content onClick={() => histroy.push("/cate/tech")}>
                Tech
              </Content>
            </ContentBox>
            <ContentBox>
              <ContentTitle>Contact</ContentTitle>
              <Content>Advertise</Content>
              <Content>FAQ</Content>
              <Content>Contact us</Content>
            </ContentBox>
            <ContentBox>
              <ContentTitle>SomeThing</ContentTitle>
              <Content>dummy</Content>
              <Content>dummy</Content>
              <Content>dummy</Content>
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

const point = "550px";

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

  @media screen and (max-width: 550px) {
    display: block;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
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
  font-size: 35px;

  @media screen and (max-width: 550px) {
    width: 100px;
    //display: flex;
    font-size: 30px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InfoBox = styled.div`
  margin-left: auto;
  display: flex;
  grid-gap: 1.5vw;

  @media screen and (max-width: 550px) {
    //align-items: center;
    justify-content: center;
    text-align: center;
    grid-gap: 40px;
    margin-top: 20px;
  }
`;

const ContentBox = styled.div`
  width: 15vw;
  height: 100%;
  text-align: center;
`;

const ContentTitle = styled.div`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.thin};
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SocialBox = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-gap: 20px;
  font-size: 35px;
`;

const SocialIconContainer = styled.a`
  color: inherit;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;