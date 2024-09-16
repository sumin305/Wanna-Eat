import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const ModalStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 2fr 0.5fr;
  position: fixed;
  background-color: white;
  border-radius: ${theme.borderRadius.default};
  padding: 0.5rem;
  width: 70%;
  height: 20%;
  overflow-y: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 480px) {
    width: 336px;
    justify-content: center;
  }
`;

const TitleStyled = styled.div`
  font-size: ${theme.fontSize.px13}rem;
  margin-top: 10px;
  text-align: center;
  grid-row: 3;
`;

const OneButtonContainerStyled = styled.div`
  grid-row: 6;
`;
const ButtonContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr;
  grid-row: 6;
  column-gap: 10%;
  justify-content: center;
`;

export {
  ModalStyled,
  TitleStyled,
  OneButtonContainerStyled,
  ButtonContainerStyled,
};
