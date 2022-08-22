import { useState } from "react";

import styled, { css } from "styled-components";

export default function Pagenation({
  onChange = async (num) => {}, //페이지 변경 시 call
  defaultPageSize,
  defaultCurrent = 1,
  total, //총 페이지 수
  hideOnSingle = false, //페이지가 하나만 있을 경우 표시
  hideNav = false, // next, prev 버튼 숨김
}) {
  const isNotSingle = total !== 1;

  //현재 페이지
  const [current, setCurrent] = useState(defaultCurrent);

  //페이지 눌리면 call
  const onClick = (pageNum) => {
    if (pageNum === current) return;

    setCurrent(pageNum);
    onChange(pageNum);
  };
  
  //페이지 숫자들 렌더링
  const pages = [];
  for (let i = 0; i < total; i++) {
    let selected;
    if (current === i + 1) {
      selected = true;
    }
    pages.push(
      <Page key={i} selected={selected} onClick={() => onClick(i + 1)}>
        {i + 1}
      </Page>
    );
  }

  const prevOnClick = () => {
    if (current > 1) {
      setCurrent((current) => current - 1);
      onChange(current - 1);
    }
  };

  const nextOnClick = () => {
    if (current < total) {
      setCurrent((current) => current + 1);
      onChange(current + 1);
    }
  };

  const prev = <Page onClick={prevOnClick}>&lt;&lt;</Page>;
  const next = <Page onClick={nextOnClick}>&gt;&gt;</Page>;

  if (hideOnSingle && !isNotSingle) {
    return <></>;
  }

  return (
    <PageDiv>
      {isNotSingle && !hideNav && prev}
      {pages}
      {isNotSingle && !hideNav && next}
    </PageDiv>
  );
}

const PageDiv = styled.div`
  display: flex;
`;

const Page = styled.div`
  color: #b1b1b1;
  margin: 5px;
  font-size: 20px;
  cursor: pointer;
  padding: 3px;
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #525252;
    transition: 0.2s;
  }

  ${(props) =>
    props.selected &&
    css`
      color: black;
      transition: 0.2s;
    `}
`;
