import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Select from "react-select";

import styled from "styled-components";
import ContextMenu from "../components/ContextMenu";
import SearchBar from "../components/elements/SearchBar";
import ModalConfirm from "../components/modal/ModalConfirm";
import Pagenation from "../components/Pagenation";

import { deleteNews, newsApprove, newsList, newsSetMain } from "../service/NewsApi";
import { NEWS_CATE, NEWS_MAIN } from "../const";
import CateOption from "../components/elements/CateOption";

export default function AdminPage({}) {

  const history = useHistory();

  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

  //검색 조건
  const [newsState, setNewsState] = useState({
    page: 0,
    size: 8,
    query: "",
    cate: "",
    approved: null,
  });

  const {
    isError,
    isLoading,
    data: newsItems,
  } = useQuery(["News", newsState.page], () => newsList(newsState));  

  console.log(newsItems)
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

  //뉴스 요소 렌더링
  const list = newsItems?.data?.content?.map((news, index) => {
    const menu = [];
    console.log(news.newsMain);
    
    //메뉴 설정
    //뉴스가 승인되지 않았으면
    if (!news.newsApproved){
      menu.push({
        name: "뉴스 승인",
        onClick: () => {
          openModal({
            content: "뉴스를 승인하시겠습니까?",
            onClick:() => {
              newsApproveMutation.mutate({id : news.newsId, approved: true});
            }
          })
        }
      })

    } else {
      menu.push({
        name: "승인 취소",
        onClick: () => {
          openModal({
            content: "승인을 취소합니다.",
            onClick: () => {
              newsApproveMutation.mutate({ id: news.newsId, approved: false });
            },
          });
        },
      });
    }

    //일반 뉴스면 카테고리 메인, 메인 여부 추가한다.
    if (news.newsMain !== NEWS_MAIN.MAIN && news.newsApproved) {
      //메인으로 설정
      menu.push({
        name: "Set Main",
        onClick: () => {
          openModal({
            content: "메인 뉴스로 설정합니다.",
            onClick: () => {
              newsMainMutation.mutate({
                id: news.newsId,
                main: NEWS_MAIN.MAIN,
              });
            },
          });
        },
      });
    }

      //카테고리 메인으로 설정
    if (news.newsMain !== NEWS_MAIN.CATEMAIN && news.newsApproved) {
      menu.push({
        name: "Set Cate Main",
        onClick: () => {
          openModal({
            content: "카테고리 뉴스로 설정합니다.",
            onClick: () => {
              newsMainMutation.mutate({
                id: news.newsId,
                main: NEWS_MAIN.CATEMAIN,
              });
            },
          });
        },
      });
    }

      //삭제
      menu.push({
        name: "Delete",
        onClick: () => {
          openModal({
            content: "정말 삭제하시겠습니까?",
            onClick: () => {
              newsDelteMutation.mutate(news);
            },
          });
        },
      });

    // 업데이트 페이지로 이동
    menu.push({
      name: "Update",
      onClick: () => {
        history.push(`/update/${news.newsId}`);
      },
    });

    return (
      <Item>
        <ItemInfo>{news.newsId}</ItemInfo>
        <ItemInfo>
          <ContextMenu menu={menu}>
            <MenuLink to={`/news/${news.newsId}`}>
              {news.newsTitle}
              <SubInfoBox>
                &#40;{news.newsMain}&#41;
                {news.newsApproved ? `approved` : "yet"}
              </SubInfoBox>
            </MenuLink>
          </ContextMenu>
        </ItemInfo>

        <ItemInfo>{news.userName}</ItemInfo>
        <ItemInfo>{news.createdAt}</ItemInfo>
      </Item>
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
              <SearchBar />
            </SearchBarBox>
            <CateOption onChange={(option)=>{console.log(option)}}/>
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
          <Pagenation total={newsItems?.data?.totalPages} />
        </PageBox>
      </Body>
      <ConfirmModal />
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

const Item = styled.li`
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