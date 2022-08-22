import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Button({
    width,
    height,
    onClick,
    text,
    fontSize = "25px",
    children,
    color = "primary"
}) {


    return (
      <StyledButton
        onClick={onClick}
        width={width}
        height={height}
        fontSize={fontSize}
      >
        {children}
      </StyledButton>
      );
}

const StyledButton = styled.button`
  border-radius: 5px;
  background-color: ${({props, theme }) =>  theme.colors.primary};
  
  color: white;
  box-shadow: 0px 2px 2px #ddd;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  &:hover {
    background-color: #172d40;
    color: #fff;
    transform: translate();
    transition: 0.3s ease-out;
  }
`;

Button.defaultProps = {

  onClick: () => {},
  width: "100%",
  color: "white",
  height: "100%",
  fontSize: "15px"
};