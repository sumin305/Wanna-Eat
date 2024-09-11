/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '../../../style/common/theme';

const blackOutStyle = css`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndex.blackLayout};
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
`;

const WEBlackOutLayout = ( {close} ) => {
  return <div css={blackOutStyle} onClick={close}></div>;
};

export default WEBlackOutLayout;
