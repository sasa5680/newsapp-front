import React from "react";
import { useMediaQuery } from "react-responsive";

import { StyleTitle, StyleCate, StyleSubTitle } from "../../styles/Common";
import styled from "styled-components";
import ContentLink from "../ContentLink";
import CardMobile from "./CardMobile";

export default function CardLiner({newsData}) {

    let isMobile = useMediaQuery({ query: "(max-width: 800px)" });

    if (isMobile) return <CardMobile newsData={newsData} />;

    return (
      <ContentLink to={`/news/${newsData?.newsId}`}>
        <CardBox>
          <ImageBox>
            <StyledImage src={newsData?.newsProfile} />
          </ImageBox>
          <ContentBox>
            <TextBox>
              <CateBox>{newsData?.newsCate}</CateBox>
              <TitleBox>{newsData?.newsTitle}</TitleBox>
              <SubTitleBox>{newsData?.newsSubTitle}</SubTitleBox>
            </TextBox>
            <WriterBox>{newsData?.userName}</WriterBox>
          </ContentBox>
        </CardBox>
      </ContentLink>
    );
}

const CardBox = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 4 / 1;
`;
const ImageBox = styled.div`
    height: 100%;
    aspect-ratio: 4 / 3;
`
const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ContentBox = styled.div`
  
  margin-left: 3vw;
  margin-right: 3vw;

  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  margin-top: 1.5vw;
  width: 100%;
`

const CateBox = styled.div`
  ${StyleCate}
`;

const TitleBox = styled.div`
  ${StyleTitle}
`;

const SubTitleBox = styled.div`
  ${StyleSubTitle}
  //margin-top: 2.0vw;
`

const WriterBox = styled.div`
`;
