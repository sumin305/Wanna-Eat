import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const ModalStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 2fr 0.5fr;
  position: fixed;
  background-color: ${theme.color.white};
  border-radius: ${theme.borderRadius.default};
  padding: 0.5rem;
  width: 70%;
  height: 20%;
  overflow-y: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 480px) {
    padding: 0;
    width: 80%;

    width: 336px;
    justify-content: center;
  }
`;

const TitleStyled = styled.div`
  font-size: ${theme.fontSize.px13};
  margin-top: 10px;
  text-align: center;
  grid-row: 3;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px17};
  }
`;

const OneButtonContainerStyled = styled.div`
  grid-row: 6;
`;
const ButtonContainerStyled = styled.div`
  display: flex;
  grid-row: 6;
  gap: 1rem; /* 버튼 사이의 간격 추가 */
`;

export {
  ModalStyled,
  TitleStyled,
  OneButtonContainerStyled,
  ButtonContainerStyled,
};
