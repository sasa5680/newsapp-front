import React from "react";
import { useQuery } from "react-query";

import CardBig from "../components/newsCard/CardBig";
import CardSmall from "../components/newsCard/CardSmall";

import styled from "styled-components";
import CardLiner from "../components/newsCard/CardLiner";
import CardSmallTest from "../components/newsCard/CardSmallTest";
import { readMainNews } from "../service/NewsApi";
import { NEWS_CATE, NEWS_MAIN } from "../const";
import ErrorPage from "./ErrorPage";

export default function MainPage() {
  //fetch
  const { isError, isLoading, data: newsData } = useQuery(["Main"], readMainNews);

  if(isLoading) {
    return <></>
  }

  if(isError) {
    return <ErrorPage/>
  }

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
      {Object.keys(NEWS_CATE).map((key, index) => {
        return (
          <>
            <CateTitle>{key}</CateTitle>
            <CardLiner
              newsData={
                newsData?.data.filter(
                  (news) => news.newsMain === NEWS_MAIN.CATEMAIN && news.newsCate.toUpperCase() === key
                )[0]
              }
            />
          </>
        );
      })}
      <div style={{marginBottom : "30px"}}></div>
    </>
  );
}

const CateTitle = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  //width: fit-content;
  width: 200px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white
`;
