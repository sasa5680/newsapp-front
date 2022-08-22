import React, {useState, useEffect} from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

//Socket 메세지 컴포넌트
export default function Message () {

  const [message, setMessageState] = useState("");

  let sockJS = new SockJS("http://localhost:8080/socket");
  let stompClient = Stomp.over(sockJS);
  stompClient.debug = () => {};
  
  useEffect(()=>{
    stompClient.connect({},()=>{
      
      //새 뉴스가 생성되면 callback
      stompClient.subscribe("/topic/new", (data) => {
        console.log(data);
      });
      console.log()
  });
  },[]);  

  return (
    <div>
      Message
    </div>
  );
}

