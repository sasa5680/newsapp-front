import React from "react";
import styled from "styled-components";

export default function NotFoundPage() {

  return (
    <Body>
      404 Not Found!
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
`;


