import React from "react";
import styled from "styled-components";

export default function BurgerMenu() {

  return (
    <Body>
      <i class="fa fa-bars"></i>
    </Body>
  );  
}

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ props, theme }) => theme.colors.primary};
  font-size: 40px;
`;

  
