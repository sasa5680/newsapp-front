import React, { useEffect, useState } from "react";
import { blockScroll, blockWheel } from "../utils";
import styled from "styled-components";
export default function ContextMenu({ menu = [], children }) {
  const [state, setState] = useState({
    show: false,
    xPos: 0,
    yPos: 0,
  });

  const list = menu.map((item, index) => {
    return (
      <Menu
        onClick={(e) => {
          item.onClick();
        }}
      >
        {item.name}
      </Menu>
    );
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    

    return () => {
      document.removeEventListener("click", handleClick);

    };
  }, []);

  //휠 이벤트 블락
  useEffect(() => {
    if (state.show) {
      console.log("show");
      document.addEventListener("wheel", blockWheel, { passive: false }); // modern desktop
      window.addEventListener("scroll", blockScroll);
      //window.addEventListener("keypress", handleWheelEvent);
    } else {
      console.log("remove")
      //window.removeEventListener("keypress", handleWheelEvent);
      document.removeEventListener("wheel", blockWheel, { passive: false });
      window.removeEventListener("scroll", blockScroll);

    }
    return () => {
      
    }
  }, [state.show]);
  
  const handleClick = (e) => {
    setState((state) => ({ ...state, show: false }));
  };

  //마우스 우클릭 이벤트 발생
  const handleContextMenu = (e) => {
    console.log(e);
    let posX;
    let posY;

    posX = `${e.PageX + "px"}`;
    posY = `${e.PageY + "px"}`;

    setState((state) => ({ posX: posX, posY: posY, show: true }));

    // const screenW = window.innerWidth;
    // const screenH = window.innerHeight;
    // const rootW = this.root.offsetWidth;
    // const rootH = this.root.offsetHeight;

    // const right = screenW - clickX > rootW;
    // const left = !right;
    // const top = screenH - clickY > rootH;
    // const bottom = !top;

    // if (right) {
    //   posX = `${clickX + 5}px`;
    // }

    // if (left) {
    //   posX = `${clickX - rootW - 5}px`;
    // }

    // if (top) {
    //   posY = `${clickY + 5}px`;
    // }

    // if (bottom) {
    //   posY = `${clickY - rootH - 5}px`;
    // }

    // setState({ show: true, xPos: posX, yPost: posY });

    e.preventDefault();

    // ...
  };

  return (
    <Box onContextMenu={handleContextMenu}>
      {children}
      {state.show && (
        <MenuBox xPos={state.xPos} yPos={state.yPos}>
          {list}
        </MenuBox>
      )}
    </Box>
  );
}

const Box = styled.div`

`

const MenuBox = styled.div`
  top: ${(props) => props.xPos};
  left: ${(props) => props.yPos};
  position: fixed;

  width: 200px;
  height: 300px;
  z-index: 100;
  background-color: #000000;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Menu = styled.div`
  width: 100%;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  //justify-content: center;
  border-bottom: 3px dotted ${({ theme }) => theme.colors.primary};

  :first-child {
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;