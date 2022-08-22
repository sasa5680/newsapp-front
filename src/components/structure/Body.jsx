import React, { useEffect } from "react";

import styled from "styled-components";

export default function Body({children}) {
  return <MainBox>{children}</MainBox>;
}

const MainBox = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
