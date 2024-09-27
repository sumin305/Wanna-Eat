import styled from '@emotion/styled';

const RestaurantRegistPageStyled = styled.div`
  /* margin-left: 100px; */
  height: 200vh;
  overflow-y: auto;

  @media (min-width: 480px) {
    width: 480px;
  }
`;

const TabWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const TextfieldsStyled = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2.44rem;
`;

const TextfieldWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  label {
    font-size: 0.8125rem;
    font-weight: 700;
    margin-bottom: 0.37rem;
  }

  & > div {
    margin-left: 0;
    margin-right: 0;
  }
`;

export {
  RestaurantRegistPageStyled,
  TabWrapperStyled,
  TextfieldsStyled,
  TextfieldWrapperStyled,
};
