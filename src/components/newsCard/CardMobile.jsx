import React from "react";
import { useMediaQuery } from "react-responsive";

import { StyleTitle, StyleCate, StyleSubTitle } from "../../styles/Common";
import styled from "styled-components";
import ContentLink from "../ContentLink";

//모바일 전용 뷰
export default function CardMobile({newsData}){

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
    width: 100%;
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
  //margin-left: 1vw;
  //margin-right: 1vw;
`;

const TitleBox = styled.div`
  //margin-top: 2vw;
  font-size: 30px;
`;

const SubTitleBox = styled.div`
  //margin-top: 1.5vw;
  ${StyleSubTitle}
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;

  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CateBox = styled.div`
  margin-top: 1vw;
  font-size: 18px;
`;

const WirterBox = styled.div`
  margin-top: 5px;
  font-size: 15px;
`;
