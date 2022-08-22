//페이지 이동할 경우 경고 날리는 컴포넌트

import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";
export default function PageExitAlert({isDirty= false, message="작성중인 내용이 있습니다."}){

  useEffect(() => {
    console.log("error")
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  
  return (
    <>
      <Prompt when={isDirty} message={message} />
    </>
  );
}