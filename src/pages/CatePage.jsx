import React, {useState } from "react";
import { useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import styled from "styled-components";
import CardBig from "../components/newsCard/CardBig";
import CardLiner from "../components/newsCard/CardLiner";
import ScrollLoading from "../components/ScrollLoading";
import { NEWS_MAIN } from "../const";

import { readNewsListUser, readNews } from "../service/NewsApi";

export default function CatePage({ match }) {
  
  const [pageState, setPageState] = useState({
    list: [],
    page: -1,
    isLast: false,
  });

  const { isLoading, data: cateMain } = useQuery(
    ["CateMain", match.params.cate],
    () => readNewsListUser({main: NEWS_MAIN.CATEMAIN, cate: match.params.cate, page: 0, size: 8 })
  );  
  const searchMutation = useMutation(readNewsListUser, {
    onMutate: (variable) => {},
    onError: (error, variable, context) => {},
    onSuccess: (data, variables, context) => {
      setPageState({
        list: [...pageState.list, ...data.data.content],
        page: data.data.number,
        isLast: data.data.last,
      });
    },
    onSettled: () => {},
  });

  const fetch = (page) => {
    searchMutation.mutate({main: NEWS_MAIN.NORMAL, cate: match.params.cate, page: page, size: 8 });
  };

  //match의 param 바뀌면 페이지 리셋
  useEffect(()=>{
    setPageState({
      list: [],
      page: -1,
      isLast: false,
    })
  }, [match])
  return (
    <>
      <CateTitle>{match.params.cate}</CateTitle>
      <CardBig newsData={cateMain?.data?.content[0]} />
      <NewsList>
        {pageState.list.map((item) => {
          return (
            <CardContainer>
              <CardLiner newsData={item}></CardLiner>
            </CardContainer>
          );
        })}

        {!pageState.isLast && (
          <ScrollLoading
            fetch={fetch}
            page={pageState.page}
            list={pageState.list}
            isLast={pageState.isLast}
          />
        )}
      </NewsList>
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
  color: white;
`;

const NewsList = styled.div`
  width: 80%;
  row-gap: 20px;
  margin-top: 30px;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const CardContainer = styled.div`
  &:first-child {
    border-top: 1px solid #525252;
  }

  border-bottom: 1px solid #525252;

  padding-top: 40px;
  padding-bottom: 40px;
`;