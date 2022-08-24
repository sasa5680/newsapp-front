import React, {useState } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";

import styled from "styled-components";
import CardLiner from "../components/newsCard/CardLiner";
import ScrollLoading from "../components/ScrollLoading";

import { readNewsListUser } from "../service/NewsApi";

export default function CatePage({ match }) {
  
  const [pageState, setPageState] = useState({
    list: [],
    page: -1,
    isLast: false,
  });

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
    searchMutation.mutate({ cate: match.params.cate, page: page, size: 8 });
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
      <h1>{match.params.cate}</h1>
      <NewsList>
        {pageState.list.map((item)=>{
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

const NewsList = styled.div`
  
  width: 75%;
  row-gap: 20px;
`

const CardContainer = styled.div`
  &:first-child {
    border-top: 1px solid #525252;
  }

  border-bottom: 1px solid #525252;

  padding-top: 15px;
  padding-bottom: 15px;
`;