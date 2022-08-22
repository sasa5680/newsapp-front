import { css } from "styled-components";

export const StlyeCard = css`
    border-radius: 5px;
`

export const StyleTitle = css`
  font-size: 2.8vw;
  font-weight: 700;
  &:hover {
    color: blue;
  }
`;

export const StyleSubTitle = css`
  font-size: 1vw;
  font-weight: 500;
  color: gray;
`;

export const StyleCate = css`
  font-size: 1.2vw;
  font-weight: 500;
  color: gray;
`;

export const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

