import React, { Component, useState } from "react";
import { useMutation } from "react-query";

import styled from "styled-components";
import CardLiner from "../components/newsCard/CardLiner";
import ScrollLoading from "../components/ScrollLoading";
import { newsList, readNewsListUser } from "../service/NewsApi";

export default function SearchPage({}){
  
  //fetch
  const [newsItems, setNewsItems] = useState([])
  const [pageState, setPageState] = useState({
    page: 0,
    size: 5,
    query: "",
    last: true,
  });

  const searchMutation = useMutation(readNewsListUser, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      setPageState({ ...pageState, page:data.data.page , isLast: data.data.last });
      console.log(data.data.isLast);
      setNewsItems((newsItems) => [...newsItems, ...data.data.content]);

    },
    onSettled: () => {},
  });

  const onSearch = (e) => {
    //3글자 이하면 실행하지 않음
    if (pageState.query.length <= 3) {
      return;
    }

    //기존 상태 초기화
    setNewsItems((newsItems) => []);
    searchMutation.mutate(pageState);
  };

  

  return (
    <>
      <TextBox>
        Search stories from
        <ColorTextBox> OPENNEWS</ColorTextBox>
      </TextBox>
      <SearchBox>
        <SearchBar
          onChange={(e) => {
            setPageState({ ...pageState, query: e.target.value });
          }}
        />
        <SearchButton onClick={onSearch}>
          <i class="fa fa-search"></i>
        </SearchButton>
      </SearchBox>
      <CardBox>
          {newsItems.map((item) => {
            return (
              <CardContainer>
                <CardLiner newsData={item} />
              </CardContainer>
            );
          })}
        
      </CardBox>

      {!pageState.last && (
        <ScrollLoading
          fetch={searchMutation.mutate(pageState)}
          page={pageState.page}
          list={pageState.list}
          isLast={pageState.last}
        />
      )}
    </>
  );
}

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.margins.marginTop};
  margin-left: auto;
  margin-right: auto;
  font-size: 40px;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin-top: 20px;
    display: block;
    font-size: 30px;
    text-align: center;
  }
`;

const ColorTextBox = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 11px;
  @media screen and (max-width: 700px) {
    margin-left: 0px;
  }
`;

const SearchBox = styled.div`

  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  min-width: 300px;
  position: relative;
  display: flex;
  height: 50px;

`;

const SearchBar = styled.input`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: none;
  padding: 5px;
  height: 100%;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: white;
  background-color: black
`;

const SearchButton = styled.button`
  width: 60px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const CardBox = styled.div`
  width: 70%;
  margin-top: 30px;
`;

const CardContainer = styled.div`
  

  &:first-child {
    border-top: 1px solid #525252;
  }

  

  border-bottom: 1px solid #525252;

  padding-top: 15px;
  padding-bottom: 15px;
`;