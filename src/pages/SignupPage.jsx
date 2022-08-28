import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

import ModalConfirm from "../components/modal/ModalConfirm";

import Button from "../components/elements/Button";
import { Logo, LogoText } from "../components/Logo";
import PageExitAlert from "../components/PageExitAlert";
import { signUp, userEmailDupCheck, userNameDupCheck } from "../service/UserApi";
import { useState } from "react";
import { errorMssageParser } from "../utils";

//자기소대 최대길이
const introMax = 150;

export default function SignupPage() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
    setValue,
    trigger,
  } = useForm();

  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm(); 

  //전송 뮤테이션
  const signUpMutation = useMutation(signUp, {
    onMutate: (variable) => {
      startLoading();
    },
    onError: (error, variable, context) => {
      console.log("error", error);
      openFail()
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "전송되었습니다! 이메일을 확인하세요.", closable:false, link: "/" });
    },
    onSettled: () => {
    },
  });

  //이메일 체크 mutation
  const { mutate: userEmailCheck, isLoading: emailCheckLoading } = useMutation(
    userEmailDupCheck,
    {
      onError: (error, variable, context) => {
        let content = "에러가 발생했습니다!";
        if (error.request.status === 400)
          content = errorMssageParser(error.request.response);
        openFail({ content: content });
      },
      onSuccess: (data, variables, context) => {
        setValue("emailCheck", true);
      },
    }
  );  

  //유저명 체크 mutation
  const { mutate: userNameCheck, isLoading: nameCheckLoading } = useMutation(userNameDupCheck,{
      onError: (error, variable, context) => {
        let content = "에러가 발생했습니다!";
        if (error.request.status === 400) content = errorMssageParser(error.request.response);
        openFail({ content: content });
      },
      onSuccess: (data, variables, context) => {
        setValue("nameCheck", true);
        //trigger()
      },
    }
  );  
  
  
  //전송
  const onSubmit = (data) => {
    data.userProfile = data.userProfile[0];
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    
    openModal({content: "회원가입 하시겠습니까?", onClick: ()=>{signUpMutation.mutate(formData);}})
  }; // your form submit function which will invoke after successful validation

  //프로필 이미지 띄우는 함수
  const profile = watch("userProfile")?.length >= 1
    ? URL.createObjectURL(watch("userProfile")[0])
    : "";

  return (
    <>
      {/* 페이지 새로고침 방지 */}
      {!signUpMutation.isSuccess && (
        <PageExitAlert
          isDirty={isDirty}
          message={"작성중인 내용이 있습니다."}
        />
      )}
      <CardBox>
        <TitleBox>
          <LogoBox>
            <Logo></Logo>
          </LogoBox>
          <LogoTextBox>
            <LogoText></LogoText>
          </LogoTextBox>
        </TitleBox>
        <FormBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*이메일, 유저명 중복 확인용 */}
            <input
              type="checkbox"
              style={{ display: "none" }}
              {...register("emailCheck", {
                required: "이메일 확인을 해야 합니다!",
              })}
            />
            <input
              type="checkbox"
              style={{ display: "none" }}
              {...register("nameCheck", {
                required: "유저명 확인을 해야 합니다!",
              })}
            />

            {/* User Email Edit */}
            <ItemBox>
              <LableBox>
                <i class="fas fa-at"></i>
                Email
              </LableBox>
              <InputBox>
                <InputWrapper>
                  <StyledInput
                    placeholder="example@news.com"
                    {...register("userEmail", {
                      onChange: (e) => {
                        setValue("emailCheck", false);
                      },
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z0-9._%+-]+$/,
                        message: "Email is not valid",
                      },
                      validate: (val) => {
                        if (watch("emailCheck") !== true) {
                          return "Check Email!";
                        }
                      },
                    })}
                  />
                  <CheckButton
                    disabled={emailCheckLoading}
                    onClick={() => {
                      userEmailCheck(watch("userEmail"));
                    }}
                  >
                    {!emailCheckLoading && (watch("emailCheck") ? "Y" : "N")}
                    {emailCheckLoading && <ClipLoader size={30} />}
                  </CheckButton>
                </InputWrapper>

                {errors.userEmail && (
                  <Error>{errors?.userEmail?.message}</Error>
                )}
              </InputBox>
            </ItemBox>

            {/* User Name Edit */}
            <ItemBox>
              <LableBox>
                <i class="fa fa-user icon"></i>
                Name
              </LableBox>
              <InputBox>
                <InputWrapper>
                  <StyledInput
                    placeholder="username1234"
                    {...register("userName", {
                      onChange: (e) => {
                        setValue("nameCheck", false);
                      },
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "at least 3 characters!",
                      },
                      maxLength: {
                        value: 15,
                        message: "Maximum 15 characters!",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Name is not valid",
                      },
                      validate: (val) => {
                        if (watch("nameCheck") !== true) {
                          return "Check Name!";
                        }
                      },
                    })}
                  />
                  <CheckButton
                    onClick={() => {
                      userNameCheck(watch("userName"));
                    }}
                  >
                    {!nameCheckLoading && (watch("nameCheck") ? "Y" : "N")}
                    {nameCheckLoading && <ClipLoader size={30} />}
                  </CheckButton>
                </InputWrapper>

                {errors.userName && <Error>{errors?.userName?.message}</Error>}
              </InputBox>
            </ItemBox>

            {/* User Password Edit */}
            <ItemBox>
              <LableBox>
                <i class="fas fa-lock"></i>
                PW
              </LableBox>
              <InputBox>
                <InputWrapper>
                  <StyledInput
                    type={"password"}
                    placeholder="pw@123456"
                    {...register("userPw", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 digits",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
                        message:
                          "Password must include at least one letter, number, special symbol",
                      },
                    })}
                  />
                </InputWrapper>

                {errors.userPw && <Error>{errors?.userPw?.message}</Error>}
              </InputBox>
            </ItemBox>

            {/* User Password Retype */}
            <ItemBox>
              <LableBox>
                <i class="fas fa-lock"></i>
                PW Re
              </LableBox>
              <InputBox>
                <InputWrapper>
                  {" "}
                  <StyledInput
                    type={"password"}
                    placeholder="pw@123456"
                    {...register("userPwRe", {
                      required: "Type Password Again!",
                      validate: (val) => {
                        if (watch("userPw") !== val) {
                          return "Your passwords does no match";
                        }
                      },
                    })}
                  />
                </InputWrapper>

                {errors.userPwRe && <Error>{errors?.userPwRe?.message}</Error>}
              </InputBox>
            </ItemBox>

            {/* User Intro Edit */}
            <ItemBox height={"70px"}>
              <LableBox>
                <i class="fas fa-pen"></i> Intro
              </LableBox>
              <InputBox>
                <InputWrapper>
                  <StyledTextArea
                    placeholder="Hello?"
                    rows={3}
                    {...register("userIntro", {
                      maxLength: {
                        value: 150,
                        message: "Maximum is 150",
                      },
                    })}
                  />
                </InputWrapper>

                <span style={{ display: "flex" }}>
                  {errors.userIntro && (
                    <span>
                      <Error>{errors?.userIntro?.message}</Error>
                    </span>
                  )}
                  <WordCounter>
                    {String(watch("userIntro") || "")?.length || 0}/{introMax}
                  </WordCounter>
                </span>
              </InputBox>
            </ItemBox>

            {/* 프로팔 사진 업로드 */}
            <ItemBox>
              <LableBox>
                <i class="fas fa-image"></i> Profile
              </LableBox>
              <InputBox flex={true}>
                <WriterProfile src={profile}></WriterProfile>
                <input {...register("userProfile")} type="file" />
              </InputBox>
            </ItemBox>

            {/* Submit Button */}
            <ButtonBox>
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </ButtonBox>
          </form>
        </FormBox>
      </CardBox>

      {/* 결과 상태 모달 */}
      <ConfirmModal />
    </>
  );
}

const CardBox = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 30px;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const LogoBox = styled.div`
  width: 100px;
  height: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const LogoTextBox = styled.div`
  margin-left: 50px;
  font-size: 30px;
  @media screen and (max-width: 550px) {
    margin-left: 20px;
  }
`;

const FormBox = styled.form`
  width: 100%;
  margin-top: 10px;
  padding-top: 30px;
  padding-bottom: 30px;
  border: 5px solid ${({ theme }) => theme.colors.primary};
`;

const Error = styled.div`
  color: red;
  transition: 0.3s;
  width: fit-content;
  //min-height: 30px;
`;

const ItemBox = styled.div`
  display: flex;
  //height: ${(props) => props.height || "35px"};
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  @media screen and (max-width: 550px) {
    display: block;
    margin-bottom: 5px;
  }
`;

const LableBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  font-size: 23px;
  height: 40px;
  @media screen and (max-width: 550px) {
    width: 100%;
    margin-left: 5px;
  }
`;

const InputBox = styled.div`
  width: 75%;
  height: 100%;

  ${({ flex }) =>
    flex &&
    `
    justify-content: center;
    align-items: center;
    display: flex;
  `}

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  //background-color: ${({ theme }) => theme.colors.primary};
  
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 20px;
  height: 40px;
  border: none;
  padding: 5px;
`;

const CheckButton = styled.div`
  //width: 50px;
  height: 40px;
  //width: 40px;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 20px;
  border: none;
`;

const WordCounter = styled.span`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  margin-left: auto;
`;

const WriterProfile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 50px;
  margin-right: 20px;
`;

const ButtonBox = styled.div`
  width: 50%;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;

  @media screen and (max-width: 550px) {
    width: 80%;
  }
`;