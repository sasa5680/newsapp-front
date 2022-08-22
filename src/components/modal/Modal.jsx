import React from "react";
import PropTypes from "prop-types";
import styled, {css} from "styled-components";
import Button from "../elements/Button";

function Modal({
  className,
  onClose,
  maskClosable,
  closable = true,
  visible,
  children,
  title = "Notification",
  width = "360px",
  height = "wrap-content",
  big = false,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner
          tabIndex="0"
          className="modal-inner"
          big={big}
          width={width}
          height={height}
        >
          <ModalTitle>
            <TitleTextBoxt>{title}</TitleTextBoxt>
            {closable && (
              <ButtonBox>
                <Button
                  width={"30px"}
                  height={"30px"}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <i class="fas fa-times"></i>
                </Button>
              </ButtonBox>
            )}
          </ModalTitle>
          <ModalBody>{children}</ModalBody>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ButtonBox = styled.div`
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 5px;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: ${(props) => props.width || "360px"};
  height: ${(props) => props.height || "wrap-content"};

  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 12px;

  ${(props) =>
    props.big &&
    css`
      height: 90vh;
      overflow-y: scroll;
      //transform: none;
    `}
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 30px;
`

const TitleTextBoxt = styled.div`
  font-size: 36px;
`

const ModalBody = styled.div`
  margin-top: 20px;
  font-size: 25px
`

export default Modal;
