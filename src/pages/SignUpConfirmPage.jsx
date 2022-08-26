import React, { Component, useState } from "react";
import styled from "styled-components";

import { useQuery } from "react-query";
import { userConfirmUUID } from "../service/UserApi";
import { useEffect } from "react";

export default function SignUpConfirmPage({match}){
    
  const UUID = match.params.uuid;  

  const [state, setState] = useState({
    isLoading : false,
    isSuccess: false,
    isError: false,
  })

  useEffect(() => {
    
    const fetch = async () => {
    try {

      setState((state)=> {return {...state, isLoading:true}});
      const res = await userConfirmUUID(UUID);
      setState((state) => {
        return { ...state, isLoading: false, isSuccess: true };
      });
      
    } catch (error) {
      setState((state) => {
        return { ...state, isLoading: false, isError: true };
      });      
    }
  }
    fetch();
  }, []);


  const Loading = () => {
    return <LoadingBox>Loading...</LoadingBox>
  }

  const Success = () => {
    return (
      <Box>
        <div>
          <Title>
            <IconBox color="green">
              <i class="far fa-check-circle"></i>
            </IconBox>
            <TitleText>Done!</TitleText>
          </Title>
          <ContentBox>Now you may login!</ContentBox>
        </div>
      </Box>
    );
  }

  const Error = () => {
    return (
      <Box>
        <div>
          <Title>
            <IconBox color="red">
              <i class="far fa-times-circle"></i>
            </IconBox>
            <TitleText>Error!</TitleText>
          </Title>
          <ContentBox>
            Email address verification failed. 
            Please try Again.
          </ContentBox>
        </div>
      </Box>
    );    
  }

  const Content = () => {

    if (state.isLoading) return <Loading/>;
    if (state.isError) return <Error/>;
    
    return <Success/>
  }
 
  return (
    <>
      <InfoBox>
        <Content></Content>
      </InfoBox>
    </>
  )

}

const InfoBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 700px;
  height: 400px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;

  @media screen and (max-width: 770px) {
    width: 100%;
  }

`;

const LoadingBox = styled.div`
  
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size : 20px;
`

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
`;


const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  font-size: 80px;
  color: ${(props) => props.color};

  @media screen and (max-width: 500px) {
    font-size: 60px;
  }
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 50px;
  margin-left: 30px;

  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
`;

const ContentBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 5x;
  font-size: 30px;
  text-align: center;
  max-width: 80%;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;


