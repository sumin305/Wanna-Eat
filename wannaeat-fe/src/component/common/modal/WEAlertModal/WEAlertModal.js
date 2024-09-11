import { css } from '@emotion/react';
import { theme } from '../../../../style/common/theme';

const modalStyle = css`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 2fr 0.5fr;
  position: fixed;
  background-color: white;
  border-radius: 0.3em;
  padding: 0.5em;
  width: 70%;
  height: 20%;
  overflow-y: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndex.modal};
`;

const titleStyle = () => css`
  font-size: 0.8em;
  margin-top: 10px;
  text-align: center;
  grid-row: 3;
`;

const buttonContainerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 6;
`;

const buttonStyle = (textColor, backgroundColor) => css`
  background-color: ${backgroundColor};
  color: ${textColor};
  font-size: 0.8em;
  border-radius: 0.3em;
  border: none;
  margin: 0 auto;
  width: 80%;
  height: 110%;
  text-align: center;
`;

export {modalStyle, titleStyle, buttonContainerStyle, buttonStyle};
