import React, { Component, useState } from "react";
import { useMutation } from "react-query";

import styled from "styled-components";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";

import ModalConfirm from "../components/modal/ModalConfirm";
import { signInEmail } from "../service/LoginApi";

import { useAccountDispatch } from "../context/AccountContext"


export default function SigninPage({location}){
  
  const dispatch = useAccountDispatch();
  const onLogin = (data) => dispatch({ type: "LOGIN", data });

  const { startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

  const [state, setState] = useState({
    userEmail : "",
    userPw: "",
  })

  const signUpMutation = useMutation(signInEmail, {
    onMutate: (variable) => {
      startLoading();
    },
    onError: (error, variable, context) => {
      let content = "에러가 발생했습니다!"
      if (error.request.status === 403) content = "일치하는 유저 정보가 없습니다!";

      console.log(error);

      openFail({
        title: "Login Error",
        content: content,
      });
    },
    onSuccess: (data, variables, context) => {
      onLogin(data.data)
      let link = location.state ? location.state.from.pathname : "/";
      openSuccess({ content: "로그인 완료!", closable: false, link: link });
    },
    onSettled: () => {},
  });  

  const onClick = () => {
    console.log(state)
    signUpMutation.mutate(state);
  }

  return (
    <>
      <TextBox>SIGN-IN</TextBox>
      <FormBox>
        <InputBox>
          <Input
            label={<i class="fa fa-user icon"></i>}
            iconSize={"25px"}
            placeholder={"Email"}
            _onChange={(e) => {
              setState({...state, userEmail: e.target.value})
            }}
          />
        </InputBox>
        <InputBox>
          <Input
            type={"password"}
            label={<i class="fa fa-lock"></i>}
            iconSize={"25px"}
            placeholder={"Password"}
            _onChange={(e) => {
              setState({ ...state, userPw: e.target.value});
            }}
          />
          <ButtonBox>
            <Button onClick={onClick} fontSize={"20px"}>Sign In</Button>
          </ButtonBox>
        </InputBox>
      </FormBox>

      <ConfirmModal />
    </>
  );
}

const TextBox = styled.div`
  width: 30vw;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;

  @media screen and (max-width: 700px) {
    width: 100%;
    text-align: center;
  }
`;

const FormBox = styled.div`
  width: 600px;
  height: 300px;
  //background-color: ${({ theme }) => theme.colors.primary};
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const InputBox = styled.div`
  width: 80%;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ theme }) => theme.margins.marginTop};

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ButtonBox = styled.div`
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  aspect-ratio: 10 / 1;

  @media screen and (max-width: 600px) {
    aspect-ratio: 10 / 1.5;
  }
`;
