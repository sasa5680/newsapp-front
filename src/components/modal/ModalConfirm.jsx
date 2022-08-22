import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import styled from "styled-components";
import Button from "../elements/Button";

export default function ModalConfirm() {
  const history = useHistory();

  const [state, setState] = useState({
    visible: false,
    maskClosable: false,
    closable: true,
    //onClose: closeModal,
    onClick: () => {},
    title: "Notification",
    content: "",
    showFooter: true,
  });

  const closeModal = () => {
    setState({ ...state, visible: false, showFooter: true });
  };

  const openModal = ({title = "Notification", content = "Content", onClick = () => {}}) => {
    setState({
      ...state,
      title: title,
      visible: true,
      maskClosable: true,
      closable: true,
      content: content,
      onClick: onClick,
    });    
  }

  const startLoading = () => {
    setState({
      ...state,
      visible: true,
      maskClosable: true,
      closable: true,
      content: "Loading...",
      showFooter: false,
    });      
  }


  const openSuccess = ({ title, content, closable = true, link }) => {
    setState({
      ...state,
      title: title,
      visible: true,
      maskClosable: closable,
      closable: closable,
      content: content,
      showFooter: false,
    });

    if (link) {
      setTimeout(() => {
        history.push(`${link}`);
      }, 3000);
    }
  };

  const openFail = ({ title = "ERROR!", content = "에러가 발생했습니다!" }) => {
    setState({
      ...state,
      title: title,
      visible: true,
      maskClosable: true,
      closable: true,
      content: content,
      onClose: closeModal,
      showFooter: false,
    });
  };

  const ConfirmModal = () => {
    return (
      <>
        <Modal
          visible={state.visible}
          maskClosable={state.maskClosable}
          closable={state.closable}
          onClose={closeModal}
        >
          {state.content}
          {state.showFooter && (
            <Footer>
              <Button
                width={"60px"}
                height={"30px"}
                onClick={() => {
                  state.onClick();
                }}
              >
                OK
              </Button>
              <Button width={"60px"} height={"30px"} onClick={closeModal}>
                취소
              </Button>
            </Footer>
          )}
        </Modal>
      </>
    );
  };

  return { openModal, startLoading, openSuccess, openFail, ConfirmModal };
}

const Footer = styled.div`
    
    margin-top: 20px;
    height: 10px;
    display: flex;
    justify-content: flex-end;
    grid-gap: 15px;
`