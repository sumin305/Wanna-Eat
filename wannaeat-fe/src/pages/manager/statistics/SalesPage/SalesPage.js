import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const SalesPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  @media (min-width: 480px) {
    height: 150vh;
    margin-bottom: 5%;
  }
`;

const SalesPageWrapperStyled = styled.div`
  width: 90%;
  height: 96%;

  padding-inline: 2%;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 480px) {
    width: 95%;
    height: 95%;

    padding-inline: 2%;
  }
`;

const SalesPageHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  margin-bottom: 15px;

  .arrow {
    cursor: pointer;
    width: 14px;
    height: 14px;
  }

  @media (min-width: 480px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 6px;
    margin-bottom: 10px;

    .arrow {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }
  }
`;

const DateStyled = styled.div`
  font-size: ${theme.fontSize.px13};
  font-weight: ${theme.fontWeight.bold};
  margin-inline: 10px;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px17};
    margin-inline: 10px;
  }
`;

const TotalRevenueStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: ${theme.fontSize.px15};
  font-weight: ${theme.fontWeight.bold};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px21};
    margin-block: 20px;
  }
`;

const TotalRevenueValueStyled = styled.div`
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.primary};
  margin-inline: 2%;
`;

const RevenueInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 15%;
  padding: 5%;
  width: 90%;
  height: 15%;
  border-radius: 15px;
  background-color: #fff9db;

  div {
    font-weight: ${theme.fontWeight.bold};
  }

  @media (min-width: 480px) {
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 5%;
  }
`;

export {
  SalesPageStyled,
  SalesPageWrapperStyled,
  SalesPageHeaderStyled,
  DateStyled,
  TotalRevenueStyled,
  TotalRevenueValueStyled,
  RevenueInfoWrapperStyled,
};
