import React from "react";
import { useState } from "react";
import styled from "styled-components";

export default function SearchBar(props){
  const {
    onChange =(e) => {},
    onSearch =(e) => {},
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

  const [search, setSearch] = useState("");

  return (
    <>
      <SearchBox>
        <SearchBarStyle
          onChange={(e) => {
            onChange(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <SearchButton onClick={()=>onSearch(search)}>
          <i class="fa fa-search"></i>
        </SearchButton>
      </SearchBox>
    </>
  );
}

const SearchBox = styled.div`
  
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

const SearchBarStyle = styled.input`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: none;
  padding: 5px;
  height: 100%;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: white;
  background-color: black;
`;

const SearchButton = styled.button`
  width: 60px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 2vw;
`;