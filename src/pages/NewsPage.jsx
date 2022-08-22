
import React, { Component, useState } from "react";
import { useQuery } from "react-query";

import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import parse from "html-react-parser";
import styled from "styled-components";

import CardSmall from "../components/newsCard/CardSmall";

import "./EditorParseStyle.css";
import Meta from "../components/Meta";
import { StyleSubTitle } from "../styles/Common";
import { testNews, testSimpleNews } from "../const";
import { readNews } from "../service/NewsApi";

export default function NewsPage({ match }) {
  
  //fetch
  const { isLoading, data: newsData } = useQuery(
    ["News", match.params.id],
    () => readNews(match.params.id)
  );
  
  //샘플뉴스
  //const newsData = testNews
  const newsSimple = testSimpleNews;
  /* 아이템 fetch */

  return (
    <>
      <Meta />
      {/* <a
        href="https://twitter.com/intent/tweet?text=this is a test&amp;via=sasa5680&amp;url=http://localhost:3000/news/&amp;original_referer=URL&amp;cid=article_share_twitter"
        data-key="twitter"
        data-template="https://twitter.com/intent/tweet?text=HEADLINE&amp;via=VIA&amp;url=URL&amp;original_referer=URL&amp;cid=article_share_twitter"
        data-track-event="mbt_navbar_share"
        data-track-key="platform"
        data-track-value="twitter"
      >
        share with twitter
      </a> */}

      {!isLoading && <NewsForm newsData={newsData?.data}></NewsForm>}
      
      {/* 연관 뉴스들 */}
      <h1 onClick={console.log(newsData)}>More Stories</h1>
      <RelatedNewsBox>
        <CardSmall newsData={newsSimple} width={"25%"} />
        <CardSmall newsData={newsSimple} width={"25%"} />
        <CardSmall newsData={newsSimple} width={"25%"} />
        <CardSmall newsData={newsSimple} width={"25%"} />
      </RelatedNewsBox>
    </>
  );
}

export const NewsForm = ({width, newsData}) => {

  return (
    <ContentBox width={width}>
      {/* 뉴스 카테고리 */}
      <CateBox>{newsData?.newsCate}</CateBox>

      {/* 뉴스 타이틀 */}
      <TitleBox>{newsData?.newsTitle}</TitleBox>

      {/* 뉴스 서브타이틀 */}
      <SubTitleBox>{newsData?.newsSubTitle}</SubTitleBox>

      {/* 작성 시간, 소셜 버튼 */}
      <TimeBox>
        {/* 작성 시간 */}
        <div>PUBLISHED {newsData?.createdAt || "01/01/1970"}</div>

        {/* 소셜 버튼 */}
        <SocialButtonsBox>
          <FacebookShareButton
            url={"www.naver.com"} //eg. https://www.example.com
            //quotes={"dddd"} //"Your Quotes"
            //hashtag={"dd"} // #hashTag
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={
              "https://zapier.com/blog/best-news-apps/#.Ys5LqyrLuaI.twitter "
            }
            title={"some content\n"}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </SocialButtonsBox>
      </TimeBox>

      {/* 구분 선 */}
      <Line />

      {/* 뉴스 프로필 이미지 */}
      <ImageBox>
        <Image src={newsData?.newsProfile} />
      </ImageBox>

      {/* 뉴스 메인 */}
      <div class="ck-content" style={{ width: "100%", marginTop: "20px" }}>
        {parse(newsData?.newsContent)}
      </div>

      {/* 작성자 정보 박스 */}
      <WriterBox>
        <WriterName>
          Written by {newsData?.user?.userName || "Anonymous"}
        </WriterName>
        <WriterProfile src={newsData?.user?.userProfile}></WriterProfile>
      </WriterBox>

      <Line />
    </ContentBox>
  );
}

const ContentBox = styled.div`
  width: ${(props) => props.width || "70%"};
  margin-top: 30px;

  @media screen and (max-width: 800px) {
   background-color: red;
  }
`;

const CateBox = styled.div`
  width: 100%;
  font-size: 1.2vw;
  font-weight: 650;
  color: ${({ theme }) => theme.colors.primary};
`;

const TitleBox = styled.div`
  width: 100%;
  font-size: 3vw;
  font-weight: ${({ theme }) => theme.fontWeight.thick};
`;
const SubTitleBox = styled.div`
  ${StyleSubTitle}
  color: ${({ theme }) => theme.colors.gray};
  width: 100%;
  font-size: 1.5vw;
  margin-top: 5px;
`;

const TimeBox = styled.div`
  color: #696969;
  font-size: 1.1vw;
  font-weight: ${({ theme }) => theme.fontWeight.thin};
  display: flex;
  align-items: center;

  margin-top: 20px;
`;

const SocialButtonsBox = styled.div`
  margin-left: auto;
  grid-gap: 5px;
  display: flex;
`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  max-width: 100%;
  aspect-ratio: 16 / 9;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

const WriterBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 10px;
  width: 100%;
  height: 2.5vw;

  font-weight: ${({ theme }) => theme.fontWeight.thin};
  color: #696969;
`;

const WriterProfile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 100%;
`;

const WriterName = styled.div`
  font-size: 1.2vw;
  margin-right: 1vw;
`;

const RelatedNewsBox = styled.div`
  
  grid-gap: 1.5vw;
  display: flex;
  margin-top: 30px;
  width: 100%;
`