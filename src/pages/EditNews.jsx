import React, { useRef , useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

import styled from "styled-components";
import "./EditorParseStyle.css";

import NewsEditor from "../components/NewsEditor";
import { createNews } from "../service/NewsApi";
import ModalConfirm from "../components/modal/ModalConfirm"

export default function EditNews() {
  
  //const { startLoading, openSuccess, openFail, ModalView } = ModalTask();
  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

  const signUpMutation = useMutation(createNews, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
      startLoading();
    },
    onError: (error, variable, context) => {
      // error
      openFail();
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "업로드 완료!", closable: false, link: "/" });
      console.log("success", data, variables, context);
    },
    onSettled: () => {
      console.log("end");
    },
  });


  async function submitForm(data) {

    console.log(data);
    openModal({content: "업로드 하시겠습니까?", onClick: ()=>{signUpMutation.mutate(data);}})
  }

  return (
    <div>
      <NewsEditor
        exitState={signUpMutation.isSuccess}
        onSubmit={submitForm}
      ></NewsEditor>

      {/* <div class="ck-content" style={{ width: "100%" }}>
        {parse(editorState)}
      </div> */}
      <ConfirmModal />
    </div>
  );
}

const ImageBox = styled.img`
  
  width: 80%;
  aspect-ratio: 4 / 3;
`
