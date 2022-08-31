import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";

import Button from "./elements/Button";
import { useForm } from "react-hook-form";
import ModalConfirm from "./modal/ModalConfirm";
import styled from "styled-components";

import { updateUser } from "../service/UserApi";
import Modal from "./modal/Modal";

export default function UserUpdate({user}) {
  
  const [visible, setVisible] = useState(false)
  
  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      userIntro: user?.userIntro,
    },
  });

  //프로필 이미지 띄우는 함수
  const profile =
    watch("userProfile")?.length >= 1
      ? URL.createObjectURL(watch("userProfile")[0])
      : user?.userProfile;

  const updateMutation = useMutation(updateUser, {
    onMutate: (variable) => {},
    onError: (error, variable, context) => {
        openFail({content: "에러가 발생했습니다!"})
    },
    onSuccess: (data, variables, context) => {
      openSuccess({content: "완료되었습니다."})
      setTimeout(()=> {
        window.location.reload();
      }, 3000) 
    },

    onSettled: () => {},
  });

  //전송
  const onSubmit = (data) => {
    data.userProfile = data.userProfile[0];
    console.log(data)
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if(data[key]) formData.append(key, data[key]);
    });

    openModal({
      content: "회원가입 하시겠습니까?",
      onClick: () => {
        console.log("Asdasd")
        updateMutation.mutate({ userId: user.userId, form: formData });
      },
    });
  }; // your form submit function which will invoke after successful validation

  const UserUpdate = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Profile</div>
        <Item>
          <WriterProfile src={profile}></WriterProfile>
          <input {...register("userProfile")} type="file" />
        </Item>
        <div>userIntro</div>
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
        <WordCounter>
          {String(watch("userIntro") || "")?.length || 0}/{150}
        </WordCounter>
        <Footer>
          <Button width={"60px"} height={"30px"}>
            확인
          </Button>
          <Button width={"60px"} height={"30px"}>
            취소
          </Button>
        </Footer>
      </form>
    );
  };

  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        width={"80px"}
        height={"40px"}
        fontSize={"20px"}
      >
        update
      </Button>
      <Modal
        maskClosable={false}
        title="Update"
        children={UserUpdate()}
        visible={visible}
        onClose={() => setVisible(!visible)}
      ></Modal>
      <ConfirmModal />
    </>
  );
}

const WriterProfile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 50px;
  margin-right: 20px;
`;

const Item = styled.div`
  display: flex;
  max-width: 100%;
  
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
`
const StyledTextArea = styled.textarea`
  width: 100%;
  font-size: 20px;
  border: none;
`;

const WordCounter = styled.span`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  margin-left: auto;
`;

const Footer = styled.div`
  
  margin-top: 20px;
  display: flex;
  width: fit-content;
  margin-left: auto;
  grid-gap: 10px;
`

const ButtonContainer = styled.div`
  width: 120px;
  height: 60px;
`