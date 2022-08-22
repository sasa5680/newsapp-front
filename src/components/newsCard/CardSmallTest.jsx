import React from "react";
import { StyleTitle, StyleCate } from "../../styles/Common";

import { hexToRgbA } from "../../utils";
import ContentLink from "../ContentLink";
import styled from "styled-components";

export default function CardSmallTest({ newsData, color }) {

  return (
    <ContentLink to={`/news/${newsData?.newsId}`}>
      <CardBox color={color}>
        <ImageBox>
          <Image src={newsData?.newsProfile} />
        </ImageBox>
        <GradientBox/>
        {/* <InfoBox>
          <CateBox>{newsData.newsCate}</CateBox>
          <TitleBox>{newsData.newsTitle}</TitleBox>
          <WriterBox>
              <WriterProfile src={newsData.user.userProfile} />
              <WriterName>{newsData.user.userName}</WriterName>
            </WriterBox>
        </InfoBox> */}
      </CardBox>
    </ContentLink>
  );
}

const CardBox = styled.div`
  position: relative;
  width: ${(props) => props.width};
  aspect-ratio: 4 / 4;

  background-color: ${(props) => props.color};
  --gradient-mid-color: ${(props) => hexToRgbA(props.color, 0.8)};
  --gradient-color: ${(props) => props.color};
  --radial-gradient-color: rgba(207, 222, 181, 0);

  border-radius: 10px;
  overflow: hidden;
`;

const ImageBox = styled.div`

  width: 100%;
  aspect-ratio: 4 / 3;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;



const GradientBox = styled.div`
  height: 33%;
  width: 100%;
  position: absolute;
  bottom: 25%;

  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--gradient-mid-color) 46%,
    var(--gradient-color) 100%
  );
`;

const InfoBox = styled.div`
  position: absolute;
  bottom: 0px;

  width: 100%;
  height: 100%;


`;
const CateBox = styled.div``;

const TitleBox = styled.div`
  font-size: 2vw;
`;

const WriterBox = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  margin-top: auto;
  width: 100%;
  height: 50px;
`;

const WriterProfile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 75%;
`;

const WriterName = styled.div`
  margin-left: 2vw;
  font-size: 1.5vw;
`;
