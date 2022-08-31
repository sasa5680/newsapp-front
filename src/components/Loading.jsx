import React from "react";
import styled from "styled-components";

import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  //페이지 상태


  //로딩 끝나면 보여줄 자식 컴포넌트
  return (
    <Body>
      <ClipLoader color={"#ff0000"} loading={true} size={100} />
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  //color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;