import React from "react";
import Modal from "./Modal";
import styled from "styled-components";

export default function ModalDelete({
  className,
  onClose,
  maskClosable,
  visible,
}) {

    return (
      <Modal visible={visible} onClose={onClose}>
        <span>정말로</span> <ColorText>삭제</ColorText><span>하시겠습니까?</span>
      </Modal>
    );
}



const ColorText = styled.span`
    color: red;
`