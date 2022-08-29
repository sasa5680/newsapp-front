import React from "react";
import { useQuery, useMutation } from "react-query";

import styled from "styled-components";
import parse from "html-react-parser";
import "./EditorParseStyle.css";

import ModalConfirm from "../components/modal/ModalConfirm";

import NewsEditor from "../components/NewsEditor";
import { testNews } from "../const";
import { readNews, updateNews } from "../service/NewsApi";

export default function UpdateNews({match}) {

  //const { startLoading, openSuccess, openFail, ModalView } = ModalTask();
  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

  //뉴스 데이터 가져옴
  const { isLoading, data: newsData } = useQuery(
    ["News", match.params.id],
    () => readNews(match.params.id)
  );

  const newsUpdateMutation = useMutation(updateNews, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
      startLoading();
    },
    onError: (error, variable, context) => {
      // error
      openFail({});
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "업로드 완료!", closable: false, link: "/admin" });
      console.log("success", data, variables, context);
    },
    onSettled: () => {
      console.log("end");
    },
  });

  //form 전송 함수
  function submitForm(data) {
    // Display the key/value pairs
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    openModal({
      content: "수정 하시겠습니까?",
      onClick: () => {
        newsUpdateMutation.mutate({ id: match.params.id, form: data });
      },
    });
  }

  return (
    <div>
      <TitleBox>뉴스 Update</TitleBox>
      {!isLoading && (
        <NewsEditor
          exitState={newsUpdateMutation.isSuccess}
          initData={newsData?.data}
          onSubmit={submitForm}
        ></NewsEditor>
      )}
      <ConfirmModal />
      {/* <div class="ck-content" style={{ width: "100%" }}>
        {parse(editorState)}
      </div> */}
    </div>
  );
}

const TitleBox = styled.div`
    
    margin-top: 30px;
    font-size: 40px;
`

const ImageBox = styled.img`
  width: 80%;
  aspect-ratio: 4 / 3;
`;
