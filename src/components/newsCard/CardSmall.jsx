import React from "react";
import { useMediaQuery } from "react-responsive";

import ContentLink from "../ContentLink";
import styled from "styled-components";

import CardMobile from "./CardMobile";

import { StyleTitle, StyleCate } from "../../styles/Common";


export default function CardSmall({newsData}) {

    let isMobile = useMediaQuery({ query: "(max-width: 700px)" });

    if (isMobile) return <CardMobile newsData={newsData} />;

    return (
      <ContentLink to={`/news/${newsData?.newsId}`}>
        <CardBox>
          <ImageBox>
            <Image src={newsData?.newsProfile} />
          </ImageBox>
          <InfoBox>
            <CateBox>{newsData?.newsCate}</CateBox>
            <TitleBox>{newsData?.newsTitle}</TitleBox>
            {/* <WriterBox>
              <WriterProfile src={newsData.user.userProfile} />
              <WriterName>{newsData.user.userName}</WriterName>
            </WriterBox> */}
          </InfoBox>
        </CardBox>
      </ContentLink>
    );
}

const CardBox = styled.div`
  position: relative;
  width: ${(props) => props.width || "100%"};
`;

const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  //object-fit: cover;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 10vw;
`;
const CateBox = styled.div`
  margin-top: 5px;
  ${StyleCate}
`;

const TitleBox = styled.div`
  ${StyleTitle}

  font-size: 2vw;
`;
