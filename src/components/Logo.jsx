import React from "react";

import styled from "styled-components";

export function LogoText({fontSize}) {

  return (
    <LogoTextBox>
      <div>OPE</div>
      <ColorWord>NN</ColorWord>
      <div>WES</div>
    </LogoTextBox>
  )

}

const LogoTextBox = styled.div`
  //font-size: ${(props) => props.fontSize || "20px"};
  font-weight: ${(props) => props.fontWeight || "700"};
  display: flex;
`;

const ColorWord = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

export function Logo(){

    return (
      <Body>
        <Parallelogram />
        <Inner/>
      </Body>
    );
}

const Body = styled.div`
  width: 100%;
  aspect-ratio: 1.5 / 1;
  position: relative;
`;

const Parallelogram = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  transform: skew(-20deg);
`; 

const Inner = styled.div`
  position: absolute;
  width: 60%;
  height: 50%;
  background-color: #000000;
  transform: translate(-50%, -50%) skew(-20deg);

  top: 50%;
  left: 50%;

  /* transform: translate(

  ); */
`;