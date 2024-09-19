import { useNavigate } from "react-router-dom";
import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx";
import { ButtonWrapper } from "../TimeSelectPage/TimeSelectPage";
import theme from "../../../../../style/common/theme.js";
import Button from "../../../../../component/common/button/WEButton/WEButton.jsx";
import { DepositInfoPageContainer, DepositInfoContainer, DepositPriceInfoWrapper, DepositPriceInfo, DepositPriceText } from "./DepositInfopage.js";
const DepositInfoPage = () => {
    const navigate = useNavigate();
    const price = 50000;
    const handleBeforeButtonClick = () => {
        navigate('/customer/reservation/seat-select')
    }
    const handleNextButtonClick = () => {
        navigate('/customer/reservation/deposit-payment')
    }
    return(
        <DepositInfoPageContainer>
            <WEStep index={2}/>
            <DepositInfoContainer>
                <DepositPriceInfoWrapper><DepositPriceInfo type={'number'}>{price.toLocaleString()}</DepositPriceInfo> <DepositPriceInfo>원</DepositPriceInfo></DepositPriceInfoWrapper>
                <DepositPriceText>결제해주세요.</DepositPriceText>
            </DepositInfoContainer>
            <ButtonWrapper>
                <Button onClick={handleBeforeButtonClick} size="short" color={"black"} backgroundColor={theme.color.disabled}>취소</Button>
                <Button onClick={handleNextButtonClick} size="venti">결제</Button>
            </ButtonWrapper>
        </DepositInfoPageContainer>
    )

}

export default DepositInfoPage;