import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ContentLink({ children, to }) {
  return <StyledLink to={to}>{children}</StyledLink>;
}
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  :hover {
    color: black;
  }
`;
