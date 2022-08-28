import React, {useState, useEffect} from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

//Socket 메세지 컴포넌트
export default function Message () {

  const [message, setMessageState] = useState("");
  const [visible, setVisible] = useState(true);

  let sockJS = new SockJS("http://localhost:8080/socket");
  let stompClient = Stomp.over(sockJS);
  stompClient.debug = () => {};
  
  useEffect(()=>{
    stompClient.connect({},()=>{
      
      //새 뉴스가 생성되면 callback
      stompClient.subscribe("/topic/new", (data) => {
        console.log(data);
      });
  });
  },[]);  

  return (
    <Body visible={visible}>
      <IconBox>
        <i class="far fa-bell"></i>
      </IconBox>
      <TextBox>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium pariatur obcaecati omnis incidunt maxime natus.
      </TextBox>
    </Body>
  );
}

const Body = styled.div`
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray};
  position: fixed;
  bottom: ${(props) => (props.visible ? "0px" : "-60px")};

  display: flex;

  transition: 0.3s;
  z-index: 100;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 40px;
  }
`;

const IconBox = styled.div`
  height: 100%;
  aspect-ratio: 1.5 / 1;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background-color: ${({ theme }) => theme.colors.primary};

  @media screen and (max-width: 700px) {
    aspect-ratio: 1 / 1;
    font-size: 27px;
  }
`;

const TextBox = styled.div`
  height: 100%;
  width: auto;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 35px;
  color: ${({ theme }) => theme.colors.primary};

  word-break: break-all;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 700px) {
    font-size: 27px;
  }
`;
