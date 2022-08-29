import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { NewsForm } from "../../pages/NewsPage";
import { testNews } from "../../const";
import { useEffect } from "react";
export default function ModalPreview({
  className,
  onClose,
  maskClosable,
  visible,
  newsData = testNews,
  isMobile = false,
}) {

  console.log(newsData)
;  

  return (
    <Modal
      width={"60vw"}
      visible={visible}
      onClose={onClose}
      title={"Preview"}
      big={true}
      maskClosable={true}
    >
      <NewsForm width={"100%"} newsData={newsData} />
    </Modal>
  );
}
