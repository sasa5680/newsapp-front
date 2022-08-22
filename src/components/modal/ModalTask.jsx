import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import styled from "styled-components";

export default function ModalTask() {

  const history = useHistory();

  const [state, setState] = useState({
    visible: false,
    maskClosable: false,
    closable: true,
    onClose: ()=>{},
    title: "null",
    content: "",
  })

  const startLoading = () => {
    setState({...state, visible: true, closable: false, maskClosable: false, content: "Loading..."})
  }

  const closeModal = () => {
    setState({...state, visible: false});
  }
 
  const openSuccess = ({title, content, closable=true, link}) => {
    setState({
      title: title,
      visible: true,
      maskClosable: closable,
      closable: closable,
      content: content,
    });

    if(link) {
      setTimeout(()=>{
        history.push(`${link}`);
      }, 3000)
    }

  }

  const openFail = ({title="ERROR!", content="에러가 발생했습니다!"}) => {
    setState({
      visible: true,
      maskClosable: true,
      closable: true,
      content: content,
      onClose: closeModal,
    });

  }

  const ModalView = () => {
    return (
      <>
        <Modal
          visible={state.visible}
          maskClosable={state.maskClosable}
          closable={state.closable}
          onClose={state.onClose}
        >
          {state.content}
        </Modal>
      </>
    );
  }
  
  return { startLoading, openSuccess, openFail, ModalView };
}


