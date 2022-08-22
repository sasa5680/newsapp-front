import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import CardBig from "../newsCard/CardBig";

import { testSimpleNews } from "../../const";
import CardLiner from "../newsCard/CardLiner";
import CardSmall from "../newsCard/CardSmall";

export default function ModalPreviewBig({
  className,
  onClose,
  maskClosable,
  visible,
  newsData = testSimpleNews,
}) {

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={"Preview"}
      width={"90vw"}
      big={true}
      maskClosable={true}
    >
      <div>
        <CardBig newsData={newsData}></CardBig>
        <Divder />
        <CardLiner newsData={newsData}></CardLiner>
        <Divder />
        <CardSmallBox>
          <CardSmall newsData={newsData}></CardSmall>
        </CardSmallBox>
      </div>
    </Modal>
  );    
}

const Divder = styled.div`
    height: 30px;
`

const CardSmallBox = styled.div`
    width: 300px;
`