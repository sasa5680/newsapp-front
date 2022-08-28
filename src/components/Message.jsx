import React, {useState, useEffect} from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";
import ContentLink from './ContentLink';

//요소 보여줄 시간 (ms)
const ShowTime = 7000;

//Socket 메세지 컴포넌트
export default function Message () {

  const [message, setMessageState] = useState({
    newsId : 140,
    newsTitle : "sample",
  });
  const [visible, setVisible] = useState(false);

  let sockJS = new SockJS("http://localhost:8080/socket");
  let stompClient = Stomp.over(sockJS);
  stompClient.debug = () => {};
  
  useEffect(()=>{
    stompClient.connect({},()=>{
      
      //새 뉴스가 생성되면 callback
      stompClient.subscribe("/topic/new", (frame) => {
        
        const data = JSON.parse(frame.body);
        setVisible(true);
        setMessageState(data);

        //일정 시간 이후 비활성화
        setTimeout(() => {
          setVisible(false);
        }, ShowTime);
      });
  });
  },[]);  

  return (
    <ContentLink to={`/news/${message.newsId}`}>
      <Body visible={visible}>
        <IconBox>
          <i class="far fa-bell"></i>
        </IconBox>
        <TextBox>
          <Text>{message.newsTitle}</Text>
        </TextBox>
      </Body>
    </ContentLink>
  );
}

const Body = styled.div`
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60px;
  background-color: #292929;
  //background-color: ${({ theme }) => theme.colors.gray};
  position: fixed;
  bottom: ${(props) => (props.visible ? "0px" : "-60px")};

  display: flex;

  transition: 0.3s;
  z-index: 100;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 50px;
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
  //justify-content: center;

  font-size: 25px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 700px) {
    font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Text = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

