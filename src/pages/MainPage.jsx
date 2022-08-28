import React from "react";
import { useQuery } from "react-query";

import CardBig from "../components/newsCard/CardBig";
import CardSmall from "../components/newsCard/CardSmall";

import styled from "styled-components";
import CardLiner from "../components/newsCard/CardLiner";
import CardSmallTest from "../components/newsCard/CardSmallTest";
import { readMainNews } from "../service/NewsApi";
import { NEWS_CATE, NEWS_MAIN } from "../const";

// //샘플뉴스
// const newsData = {
//   newsId: 1,
//   newsProfile:
//     "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
//   newsTitle: "Meet the Lobbyist Next Door",
//   newsSubTitle: "A long history of constraining the river through levees has led to massive land loss in its delta. Can people engineer a way out?",
//   newsCate: "ECONOMY",
//   user: {
//     userName: "sasa5680",
//     userProfile:
//       "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
//   },
// };

export default function MainPage() {
  //fetch
  const { isLoading, data: newsData } = useQuery(["Main"], readMainNews);

  return (
    <>
      <CateTitle>Today's Topic</CateTitle>
      <CardBig
        newsData={
          newsData?.data?.filter((news) => news.newsMain === NEWS_MAIN.MAIN)[0]
        }
      />
      {/* <TodayNewsSub>
        <CardSmall newsData={newsData} width={"25%"} />
        <CardSmall newsData={newsData} width={"25%"} />
        <CardSmall newsData={newsData} width={"25%"} />
        <CardSmallTest newsData={newsData} width={"25%"} color={"#151824"} />
      </TodayNewsSub> */}

      <CateTitle>{NEWS_CATE.ECONOMY}</CateTitle>
      <CardLiner
        newsData={
          newsData?.data.filter((news) => news.newsMain === NEWS_MAIN.MAIN)[0]
        }
      />
      <CateTitle>{NEWS_CATE.SCIENCE}</CateTitle>
    </>
  );
}

const TodayNewsSub = styled.div`
  
  grid-gap: 1.5vw;
  display: flex;
  margin-top: 30px;
  width: 100%;

`
const CateTitle = styled.div`
  text-transform: uppercase;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;
