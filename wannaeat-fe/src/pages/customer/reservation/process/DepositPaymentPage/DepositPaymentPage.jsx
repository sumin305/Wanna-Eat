import { useNavigate } from "react-router-dom";
import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx";
import { ButtonWrapper } from "../TimeSelectPage/TimeSelectPage.js";
import theme from "../../../../../style/common/theme.js";
import Button from "../../../../../component/common/button/WEButton/WEButton.jsx";
import { DepositPaymentPageContainer, DepositInfoContainer, DepositPriceInfoWrapper, DepositPriceInfo, DepositPriceText, DepositCardWrapper } from "./DepositPaymentPage.js";
import CardImage from '../../../../../assets/customer/card.png'
const DepositPaymentPage = () => {
    const navigate = useNavigate();
    const price = 50000;
    const cards = [
        {
            
        }
    ]
    const handleBeforeButtonClick = () => {
        navigate('/customer/reservation/seat-select')
    }
    const handleNextButtonClick = () => {
        navigate('/customer/reservation/')
    }
    return(
        <DepositPaymentPageContainer>
            <WEStep index={2}/>
            <div>
                <DepositInfoContainer>
                    <DepositPriceInfoWrapper>
                        <DepositPriceInfo type={'number'}>{price.toLocaleString()}</DepositPriceInfo> 
                        <DepositPriceInfo>원</DepositPriceInfo>
                    </DepositPriceInfoWrapper>
                    <DepositPriceText>결제해주세요.</DepositPriceText>
                </DepositInfoContainer>
                <DepositCardWrapper>
                    <img src={CardImage}/>
                </DepositCardWrapper>
            </div>
            <ButtonWrapper>
                <Button onClick={handleBeforeButtonClick} size="short" color={"black"} backgroundColor={theme.color.disabled}>취소</Button>
                <Button onClick={handleNextButtonClick} size="venti">결제</Button>
            </ButtonWrapper>
        </DepositPaymentPageContainer>
    )

}

export default DepositPaymentPage;