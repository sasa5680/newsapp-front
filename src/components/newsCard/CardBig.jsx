import React from "react";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";

import {StyleTitle, StyleCate, StyleSubTitle} from "../../styles/Common";
import ContentLink from "../ContentLink";
import CardMobile from "./CardMobile";

export default function CardBig({newsData}) {

  let isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  if(isMobile) return <CardMobile newsData={newsData}/>

  return (
    <ContentLink to={`/news/${newsData?.newsId}`}>
      <CardBox>
        <ImageBox>
          <Image src={newsData?.newsProfile} />
        </ImageBox>
        <InfoBox>
          <CateBox>{newsData?.newsCate}</CateBox>
          <TitleBox>{newsData?.newsTitle}</TitleBox>
          <SubTitleBox>{newsData?.newsSubTitle}</SubTitleBox>
          <WirterBox>by {newsData?.userName}</WirterBox>
        </InfoBox>
      </CardBox>
    </ContentLink>
  );
}

const CardBox = styled.div`

    display: flex;
    width: 100%;
    aspect-ratio: 10 / 4; /* ↔️ is double the ↕️ */

`;

const ImageBox = styled.div`
    aspect-ratio: 16 / 9;
    height: 100%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoBox = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
  margin-left: 1vw;
  margin-right: 1vw;
`;

const TitleBox = styled.div`
  margin-top: 2vw;
  ${StyleTitle}
  font-size: 3vw;
`;

const SubTitleBox = styled.div`
  margin-top: 1.5vw;
  ${StyleSubTitle}
  font-size: 1.0vw;
  color: ${({ theme }) => theme.colors.gray};
`;

const CateBox = styled.div`
  margin-top: 1vw;
  ${StyleCate}
`;

const WirterBox = styled.div`
  margin-top: 2vw;
  font-size: 1.0vw;
`;

const WriterName = styled.div`

`;