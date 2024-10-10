import styled from '@emotion/styled/macro';
import theme from '../../../../../style/common/theme';

const DepositPaymentPageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 56vh 1fr;
`;
const DepositInfoContainer = styled.div`
  align-self: center;
  align-content: center;
  margin: 0 auto;
  width: 250px;
  height: 30%;
  > * {
    width: 80%;
    margin: 0 auto;
  }
`;
const DepositPriceInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DepositPriceInfo = styled.p`
  font-size: 2.5rem;
  color: ${(props) => {
    if (props.type === 'number') return theme.color.primary;
    return 'black';
  }};
  font-weight: ${theme.fontWeight.bold};
`;
const DepositPriceText = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: ${theme.fontWeight.bold};
  text-align: end;
`;

const DepositCardWrapper = styled.div`
  text-align: center;
`;

const CardSelectBoxStyled = styled.div`
  width: 100%;
  height: 70%;
  margin: 0 auto;
  > * {
    width: 100%;
  }
`;
export {
  DepositPaymentPageContainer,
  DepositInfoContainer,
  DepositPriceInfoWrapper,
  DepositPriceInfo,
  DepositPriceText,
  DepositCardWrapper,
  CardSelectBoxStyled,
};
