import styled from '@emotion/styled';
import { theme } from '../../../../style/common/theme';

const ModalStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 2fr 0.5fr;
  position: fixed;
  background-color: white;
  border-radius: 0.3rem;
  padding: 0.5rem;
  width: 70%;
  height: 20%;
  overflow-y: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndex.modal};
`

const TitleStyled = styled.div`
  font-size: 0.813rem;
  margin-top: 10px;
  text-align: center;
  grid-row: 3;
  font-weight: 700;
`

const ButtonContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 6;
`

export {ModalStyled, TitleStyled, ButtonContainerStyled};
