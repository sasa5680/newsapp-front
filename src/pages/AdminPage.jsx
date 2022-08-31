import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Select from "react-select";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";


import styled from "styled-components";
import ContextMenu from "../components/ContextMenu";
import SearchBar from "../components/elements/SearchBar";
import ModalConfirm from "../components/modal/ModalConfirm";
import Pagenation from "../components/Pagenation";

import { deleteNews, newsApprove, newsList, newsSetMain } from "../service/NewsApi";
import { NEWS_CATE, NEWS_MAIN } from "../const";
import CateOption from "../components/elements/CateOption";
import Button from "../components/elements/Button";

//카테고리 옵션들
const optionApproved = [
  { value: "", label: "none" },
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

  //카테고리 옵션들
const optionsMain = [
  { value: "", label: "none" },
  { value: NEWS_MAIN.NORMAL, label: "normal" },
  { value: NEWS_MAIN.CATEMAIN, label: "cate" },
  { value: NEWS_MAIN.MAIN, label: "main" },
];


export default function AdminPage({}) {
  const MENU_ID = "menu-id";

  const history = useHistory();

  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

    const { show } = useContextMenu({
      id: MENU_ID,
    });
  
  function displayMenu(e, news) {
    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show(e, { props: { news: news } });
  } 

  //뉴스 리스트

  //검색 조건
  const initState = {
    page: 0,
    size: 8,
    query: "",
    cate: "",
    approved: null,
    //main: "",
  };

  const [newsState, setNewsState] = useState(initState);

  const {
    isError,
    isLoading,
    data: newsItems,
  } = useQuery(["News", newsState], () => newsList(newsState));

  //페이지 이동 시
  const pageFetch = (page) => {
    setNewsState((state)=> { return {...state, page: page-1}});
  }

  //검색어 조회 시
  const onSearch = (e) => {
    if(e.length <= 3) return;
    setNewsState((state) => {return { ...state, query: e, page: 0};});
  }

  //카테고리 조회 시
  const onCate = (option) => {
    setNewsState((state) => {return { ...state, cate:option.value, page: 0};});
  }

  /* 승인됨 여부로 조회 시 */
  const onApproved = (option) => {
    console.log(option)
    setNewsState((state) => {return { ...state, approved:option.value ,page: 0};});
  }

  /* 메인 여부로 조회 시 */
  const onMain = (option) => {
    setNewsState((state) => {return { ...state, main:option.value ,page: 0};});
  }

  //검색어 조건 리셋
  const reset = () => {
    window.location.reload();
  }

  /* 뉴스 삭제 뮤테이션 */
  const newsDelteMutation = useMutation(deleteNews, {
    onMutate: (variable) => {
      startLoading();
    },
    onError: (error, variable, context) => {
      openFail();
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "삭제 완료되었습니다."});
    },
  });    

  /* 뉴스 승인 뮤테이션 */
  const newsApproveMutation = useMutation(newsApprove, {
    onMutate: (variable) => {
      startLoading();
    },
    onError: (error, variable, context) => {
      openFail();
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "완료되었습니다." });
    },
  });

  /* 뉴스 메인 설정 뮤테이션 */
  const newsMainMutation = useMutation(newsSetMain, {
    onMutate: (variable) => {
      startLoading();
    },
    onError: (error, variable, context) => {
      openFail();
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "완료되었습니다." });
    },
  });

  function handleUpdateClick({ event, props, triggerEvent, data }){
    console.log(props)
    history.push(`/update/${props.news.newsId}`);
  }

  function handleDeleteClick({ event, props, triggerEvent, data }){
    openModal({
      content: "정말 삭제하시겠습니까?",
      onClick: () => {
        newsDelteMutation.mutate(props.news.newsId);
      },
    })
  }

  function handleApprove({ event, props, triggerEvent, data }){
    openModal({
      content: "뉴스를 승인하시겠습니까?",
      onClick: () => {
        newsApproveMutation.mutate({ id: props.news.newsId, approved: true });
      },
    });
  }

  function handleReject({ event, props, triggerEvent, data }) {
    openModal({
      content: "승인을 취소합니다.",
      onClick: () => {
        newsApproveMutation.mutate({ id: props.news.newsId, approved: false });
      },
    });
  }

  function handleSetMain({ event, props, triggerEvent, data }){
   openModal({
     content: "메인 뉴스로 설정합니다.",
     onClick: () => {
       newsMainMutation.mutate({
         id: props.news.newsId,
         main: NEWS_MAIN.MAIN,
       });
     },
   });
  }

  function handleSetCateMain({ event, props, triggerEvent, data }) {
    openModal({
      content: "카테고리 뉴스로 설정합니다.",
      onClick: () => {
        newsMainMutation.mutate({
          id: props.news.newsId,
          main: NEWS_MAIN.CATEMAIN,
        });
      },
    });
  }

  function isApproveDisabled({ props, data, triggerEvent }) {
    return props.news.newsApproved;
  }

  function isRejectDisabled({ props, data, triggerEvent }) {
    return !props.news.newsApproved;
  }

  function isCateMainDisabled({ props, data, triggerEvent }) {
    console.log(props.news.newsMain === NEWS_MAIN.CATEMAIN);
    return props.news.newsMain === NEWS_MAIN.CATEMAIN;
  }  
  
  function isMainDisabled({ props, data, triggerEvent }) {
    return props.news.newsMain === NEWS_MAIN.MAIN;
  }  

  //뉴스 요소 렌더링
  const list = newsItems?.data?.content?.map((news, index) => {
    
    return (
      <NewsItem onContextMenu={(e)=>displayMenu(e, news)}>
        <ItemInfo>{news.newsId}</ItemInfo>
        <ItemInfo>
          <MenuLink to={`/news/${news.newsId}`}>
            {news.newsTitle}
            <SubInfoBox>
              &#40;{news.newsMain}&#41;
              {news.newsApproved ? `approved` : "yet"}
            </SubInfoBox>
          </MenuLink>
        </ItemInfo>

        <ItemInfo>{news.userName}</ItemInfo>
        <ItemInfo>{news.createdAt}</ItemInfo>
      </NewsItem>
    );
  });

  return (
    <>
      <Body>
        <TitleBox>
          ADMIN PAGE
          {/* 검색 박스 */}
          <SearchBox>
            <SearchBarBox>
              <SearchBar
                onSearch={(e) => {
                  onSearch(e);
                }}
              />
            </SearchBarBox>

            {/* 카테고리 옵션 */}
            <CateOptionBox>
              <CateOption onChange={onCate} />
            </CateOptionBox>

            {/* 승인됨 여부 */}
            <CateOptionBox>
              <Select
                options={optionApproved}
                placeholder={"approved"}
                onChange={onApproved}
              ></Select>
            </CateOptionBox>

            {/* 메인 여부 */}
            <CateOptionBox>
              <Select
                options={optionsMain}
                placeholder={"main?"}
                onChange={onMain}
              ></Select>
            </CateOptionBox>

            {/* 리셋 버튼 */}
            <ResetButtonBox>
              <Button onClick={reset}>Reset</Button>
            </ResetButtonBox>
          </SearchBox>
        </TitleBox>
        <TitleList>
          <Title>id</Title>
          <Title>Title</Title>
          <Title>Writer</Title>
          <Title>Created At</Title>
        </TitleList>
        <ItemList>{list}</ItemList>
        <PageBox>
          <Pagenation
            total={newsItems?.data?.totalPages}
            onChange={pageFetch}
          />
        </PageBox>
      </Body>
      <ConfirmModal />

      {/* 콘텍스트 메뉴 */}
      <Menu id={MENU_ID}>
        <Item onClick={handleUpdateClick}>Update</Item>
        <Item onClick={handleDeleteClick}>Delete</Item>
        <Separator />
        <Item disabled={isApproveDisabled} onClick={handleApprove}>
          Approve
        </Item>
        <Item disabled={isRejectDisabled} onClick={handleReject}>
          Reject
        </Item>
        <Separator />
        <Submenu label="Set as...">
          <Item disabled={isCateMainDisabled} onClick={handleSetCateMain}>CateMain</Item>
          <Item disabled={isMainDisabled} onClick={handleSetMain}>Main</Item>
        </Submenu>
      </Menu>
    </>
  );
}

const Body = styled.div`
    width: 100%;
    margin-top: 20px;
    position: relative;
`

const TitleBox = styled.div`
  width: 100%;
  font-size: 35px;
  display: flex;
  align-items: center;
`

const SearchBox = styled.div`
  display: flex;
  height: 50px;
  margin-left: 30px;
  display: flex;
`;

const SearchBarBox = styled.div`
  width: 300px;
  height: 100%;
  font-size: 25px;
  display: flex;
`

const CateOptionBox = styled.div`
  display: flex;
  align-items: center;
  background-color: aliceblue;
  height: 100%;
  margin-left: 20px;
  font-size: 20px;
`
const ResetButtonBox = styled.div`
  
  height: 100%;
  width: 100px;
  margin-left: 20px;
`

const TitleList = styled.ul`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 0.3fr 4fr 0.5fr 0.5fr;
  justify-items: start;
  align-items: center;
  width: 100%;
  border: 1px solid black;
`;

const Title = styled.li`
  list-style: none;
  justify-items: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.0rem;
  font-weight: 600;
`;

const ItemList = styled.ul`
  width: 100%;
  //height: 83rem;
  border: 1px solid black;
  border-top: none;
  padding-top: 10px;
`;

const NewsItem = styled.li`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 0.3fr 4fr 0.5fr 0.5fr;

  //grid-template-columns: 6rem 36rem 7rem 14rem 7rem 7rem;
  justify-items: start;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid black;
`;

const ItemInfo = styled.span`
  font-size: 1.0rem;
  display: flex;
`;

const SubInfoBox = styled.span`
  font-size: 0.8rem;
  align-items: flex-end;
  justify-content: flex-end;
  grid-gap: 10px;
`;

const MenuLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.colors.primary};
    transition: 0.3s;
  }
`;

const PageBox = styled.div`
  
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
`