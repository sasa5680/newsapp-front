import React from "react";
import styled from "styled-components";
import Select from "react-select";

import { NEWS_CATE } from "../../const";

  //카테고리 옵션들
  const options = Object.keys(NEWS_CATE).map((key) => {
    return { value: key, label: key };
  });

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
