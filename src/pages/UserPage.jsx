import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";

import styled from "styled-components";

import UserUpdate from "../components/UserUpdate";
import ScrollLoading from "../components/ScrollLoading";
import { readUser } from "../service/UserApi";
import { useAccountState } from "../context/AccountContext";
import Button from "../components/elements/Button";
import ModalConfirm from "../components/modal/ModalConfirm";
import { readUserNews } from "../service/NewsApi";
import CardLiner from "../components/newsCard/CardLiner";

export default function UserPage({match}){

  const userName = match.params.userName;
  const accountState = useAccountState();

  const [pageState, setPageState] = useState({
      list: [],
      page: -1,
      isLast: false,
  });

  const {
    isError,
    isLoading,
    data: user,
  } = useQuery([userName], ()=>readUser(userName));

  const searchMutation = useMutation(readUserNews, {
    onMutate: (variable) => {},
    onError: (error, variable, context) => {},
    onSuccess: (data, variables, context) => {
      setPageState({
        //...pageState,
        list: [...pageState.list, ...data.data.content],
        page: data.data.number,
        isLast: data.data.last,
      });
    },
    onSettled: () => {},
  });

  const fetch = (page) => {
      searchMutation.mutate({userName:userName, page:page, size:8});
  }

  if(isLoading) return <></>

  return (
    <>
      {/* 유저 정보 박스 */}
      <UserBox>
        <InnerBox>
          <ProfileBox>
            <ProfileBox>
              <Profile src={user?.data.userProfile} />
            </ProfileBox>
          </ProfileBox>
          <TextBox>
            {/* 유저 이름 부분 */}
            <UserNameBox>
              <UserName> {user?.data.userName}</UserName>

              {/* 유저 업데이트 하는 버튼 */}
              {accountState.userName === match.params.userName && (
                <UpdateButtonBox>
                  <UserUpdate user={user?.data} />
                </UpdateButtonBox>
              )}
            </UserNameBox>

            {/* 유저 소개 */}
            <IntroBox>{user?.data.userIntro}</IntroBox>
          </TextBox>
        </InnerBox>
      </UserBox>

      <NewsTitleBox>{`${userName}'s News`}</NewsTitleBox>

      {/* 유저가 작성한 뉴스들 목록 */}
      <NewsBox>
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
      </NewsBox>
    </>
  );

}

const WriterProfile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 50px;
  margin-right: 20px;
`;


const UpdateItem = styled.div`
  display: flex;
`

const UserBox = styled.div`
  display: flex;
  width: 100vw;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: -5vw;
  margin-top: ${({ theme }) => theme.margins.marginTop};
  background-color: ${({ theme }) => theme.colors.grayDark};
`;

const UpdateButtonBox = styled.div`
  margin-left: auto;
  font-size: 20px;
  display: flex;
  grid-gap: 10px;

  @media screen and (max-width: 700px) {
    align-items: center;
    justify-content: center;
  }
`;

const InnerBox = styled.div`
  display: flex;

  width: 90%;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 700px) {
    display: block;
    align-items: center;
  }
`;

const ProfileBox = styled.div`
  width: 180px;
  height: 180px;

  @media screen and (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Profile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 100%;
`;

const TextBox = styled.div`
  margin-left: 4vw;
  width: 50%;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;
const UserNameBox = styled.div`
  font-size: 40px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 700px) {
    margin-top: 10px;
    display: block;
    
  }
`;

const UserName = styled.div`
  @media screen and (max-width: 700px) {
    text-align: center;
  }
`;

const IntroBox = styled.div`
  font-size: 25px;
`
const NewsTitleBox = styled.div`
  font-size: 50px;
  margin-top: 20px;

  @media screen and (max-width: 800px) {
    font-size: 30px;
  }
`;

const NewsBox = styled.div`
  width: 80%;
  margin-top: 10px;

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