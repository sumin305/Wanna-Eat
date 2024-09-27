import styled from '@emotion/styled';

const RestaurantRegistPageStyled = styled.div`
  min-height: calc(100vh + 3.125rem);
  overflow-y: auto;

  @media (min-width: 480px) {
    width: 480px;
  }
`;

const TabWithButtonStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.44rem;
`;

const TabWrapperStyled = styled.div`
  width: 64%;
`;

const ContentWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-top: 2.44rem; */
  width: 100%;
`;

const InputWithLabelStyled = styled.div``;

const InputWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 5px;
  flex-shrink: 0;
  width: 100%;

  label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 700;
    margin-bottom: 0.38rem;
    margin-left: 6%;
  }

  & > div {
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    align-items: center;
  }
`;

export {
  RestaurantRegistPageStyled,
  TabWithButtonStyled,
  TabWrapperStyled,
  ContentWrapperStyled,
  InputWithLabelStyled,
  InputWrapperStyled,
};
