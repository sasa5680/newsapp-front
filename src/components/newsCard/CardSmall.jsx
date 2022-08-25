import React from "react";
import { useMediaQuery } from "react-responsive";

import ContentLink from "../ContentLink";
import styled from "styled-components";

import CardMobile from "./CardMobile";

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
  width: ${(props) => props.width};
`;

const ImageBox = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 10vw;
  background-color: #21373c;
`;
const CateBox = styled.div`

`

const TitleBox = styled.div`
    font-size: 2vw;
`

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