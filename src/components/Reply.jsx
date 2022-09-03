import React from "react";
import styled from "styled-components";
import { dateConverter } from "../utils";

export default function Reply({list}) {

    return <ReplyBox>{list?.map((reply)=>{
        return (
          <ReplyItemBox>
            <HeaderBox>
              <StyledRow>
                <Profile src={reply.user.userProfile} />
                <UserNameBox>{reply.user.userName}</UserNameBox>
                <TimeBox>{dateConverter(reply.createdAt)}</TimeBox>
              </StyledRow>
              <ContentBox>{reply.replyContent}</ContentBox>
            </HeaderBox>
          </ReplyItemBox>
        );
    })}</ReplyBox>;
}

const ReplyBox = styled.div`
    width: 100%;
`
const ReplyItemBox = styled.div`
  width: 100%;
  margin-top: 20px;
  //border: 3px solid ${({ theme }) => theme.colors.primary};
`;
const HeaderBox = styled.div`
    width: 100%;
`
const StyledRow = styled.div`
  background-color: ${({ theme }) => theme.colors.primary}; 
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Profile = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const UserNameBox = styled.div`
    font-size: 20px;
    margin-left: 20px;
` 

const TimeBox =styled.div`
    margin-left: auto;
    margin-right: 5px;
`

const ContentBox = styled.div`
    font-size: 20px;
    padding: 20px;
    background-color: #323232;
`