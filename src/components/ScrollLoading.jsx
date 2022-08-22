//무한 스크롤 구현 컴포넌트

import React, { useEffect, useRef } from "react";

import styled from "styled-components";
export default function ScrollLoading({
    fetch = () => {}, //함수 call
    isLast, //마지막 여부
    page, //페이지
    list, //아이템들이 저장되는 배열
  }){

    const target = useRef();

    // 인터섹션 callback (스크롤이 바닥을 찍으면 call 되는 함수)
    const onIntersect = async (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if (isLast) {
            console.log("last");
            return;
          }
          //감시 해제
          observer.unobserve(entry.target);
          //새로 데이터를 요청한다.
          fetch(page + 1);
          console.log("fetch new");
        }
      });
    };

    //옵저버 등록, 포스트 리스트가 변화하면 다시 call 되어야 한다.
    useEffect(() => {
      let observer;
      if (target.current) {
        observer = new IntersectionObserver(onIntersect, { threshold: 0.0 });
        observer.observe(target.current);
      }
      return () => observer && observer.disconnect();
    }, [list]);

    return <InterSectionBox ref={target}></InterSectionBox>;
  }

const InterSectionBox = styled.div`

  width: 100%;
  height: 50px;
  background-color: blue;

`

