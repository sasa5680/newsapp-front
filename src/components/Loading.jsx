import React, { useEffect, useState } from "react";
import DefaultError from "./DefaultError";
import DefaultLoading from "./DefaultLoading";

export default function Loading({
  children,
  fetch,
  loading = DefaultLoading,
  error = DefaultError,
}) {
  //페이지 상태
  const [state, setState] = useState({
    isError: false,
    isLoading: true,
  });

  //데이터 로딩
  const Loading = async () => {

    setState({ ...state, isLoading: true }); // 로딩 시작
    try {

      const res = await fetch(); //fetch 함수 실행
      console.log(res)
      setState({ ...state, isLoading: false }); // 로딩 종료
      console.log("로딩 끝")
    } catch (error) {
      console.log(state)
      setState({ isError: true, isLoading: false }); // 에러 발생
    }
  };

  //최초 아이템 로딩
  useEffect(() => {
    Loading();
    return () => {};
  }, []);

  //로딩 시 보여줄 요소
  if (state.isLoading) return loading();

  //에러 시 보여줄 요소
  if (state.isError) return error();

  //로딩 끝나면 보여줄 자식 컴포넌트
  return <>{children}</>;
}
