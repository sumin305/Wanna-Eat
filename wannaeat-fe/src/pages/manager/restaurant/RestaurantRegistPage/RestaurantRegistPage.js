import styled from '@emotion/styled';

const RestaurantRegistPageStyled = styled.div`
  /* margin-left: 100px; */

  @media (min-width: 480px) {
    width: 480px;
  }
`;

const TabWrapperStyled = styled.div`
  margin-bottom: 10px;
`;

const TextfieldsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
