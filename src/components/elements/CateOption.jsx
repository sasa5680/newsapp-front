import React from "react";
import styled from "styled-components";
import Select from "react-select";

  //카테고리 옵션들
const options = [
    { value: "world", label: "world" },
    { value: "science", label: "science" },
    { value: "economy", label: "economy" },
];

export default function CateOption({onChange, width, fontSize}){
  return (
    <Select
      styles={{ width: `${width}`, fontSize: `${fontSize}` }}
      //defaultValue={options.filter((option) => option.label === "world")[0]}
      placeholder={"Cate"}
      options={options}
      onChange={(option) => {
        onChange(option);
      }}
    />
  );
}
