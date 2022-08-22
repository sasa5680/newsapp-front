import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Input(props){
  const {
    id,
    label,
    placeholder,
    _onChange,
    onSubmit,
    type,
    multiLine,
    edit,
    value,
    editValue,
    defaulValue,
    margin,
    width,
    padding,
    height,

    fontSize,
    iconSize,
  } = props  
    return (
      <>
        <InputContainer width={width} height={height}>
          {label && 
            <IconBox
              iconSize={iconSize}
            >
                {label}
            </IconBox>
          }
          <StyledInput
            type={type}
            value={editValue}
            defaulValue={defaulValue}
            placeholder={placeholder}
            onChange={_onChange}
            fontSize={fontSize}
          />
        </InputContainer>
      </>
    );
}

Input.defaultProps = {
  fontSize: "20px",
  iconSize: "20px",
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  defaulValue: "",
  margin: 0,
  padding: false,
  boxShadow: false,
  width: "100%",
  height: "50px",
  border: false,
  borderbottom: false,
  borderRadius: false,
  bg: false,
  backgroundImage: false,
  is_submit: false,
  _onChange: () => {},
  onSubmit: () => {},
};

const InputContainer = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;

  font-size: ${(props) => props.fontSize};
  background-color: ${({ theme }) => theme.colors.grayDark};
  border: 1px solid ${({ theme }) => theme.colors.gray};

  :focus {
    border: 3px solid ${({ theme }) => theme.colors.primary};
    transition: 0.3s;
  }
`;

const IconBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  aspect-ratio: 1.2 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.iconSize}; ;
`;


