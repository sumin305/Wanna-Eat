import styled from '@emotion/styled';

const CardManagePageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
`;

const CardNameText = styled.p`
  margin-top: 1rem;
  font-weight: bold;
`;
const CardSelectBoxStyled = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 30%;
  > * {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  > * {
    margin: 0 0.5rem;
  }
`;
export {
  CardManagePageContainer,
  CardSelectBoxStyled,
  ButtonWrapper,
  CardNameText,
};
