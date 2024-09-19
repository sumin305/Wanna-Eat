import styled from "@emotion/styled/macro";
import theme from "../../../../../style/common/theme";

const DepositInfoPageContainer = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 0.5fr;
`
const DepositInfoContainer = styled.div`
align-self: center;
justify-self: center;
text-align: -webkit-center;
align-content: center;
    width: 250px;
    height: 200px;
    > * {
        width: 80%;
    }
`

const DepositPriceInfoWrapper = styled.div`
    display: flex;
    flex-column: row;
    justify-content: center;

`
const DepositPriceInfo = styled.p`
    font-size: 2.5rem;
    color: ${(props) => {
        if (props.type === 'number') return theme.color.primary
        return 'black';
    }};
    font-weight: ${theme.fontWeight.bold};
`
const DepositPriceText = styled.p`
    font-size: ${theme.fontSize.px13};
    font-weight: ${theme.fontWeight.bold};
    text-align: end;
`
export {DepositInfoPageContainer, DepositInfoContainer, DepositPriceInfoWrapper, DepositPriceInfo, DepositPriceText}