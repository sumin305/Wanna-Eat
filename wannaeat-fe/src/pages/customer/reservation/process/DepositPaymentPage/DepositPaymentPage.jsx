import { useNavigate } from "react-router-dom";
import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx";
import { ButtonWrapper } from "../TimeSelectPage/TimeSelectPage.js";
import theme from "../../../../../style/common/theme.js";
import Button from "../../../../../component/common/button/WEButton/WEButton.jsx";
import { DepositPaymentPageContainer, DepositInfoContainer, DepositPriceInfoWrapper, DepositPriceInfo, DepositPriceText, DepositCardWrapper, CardSelectBoxStyled } from "./DepositPaymentPage.js";
import CardCarousel from "../../../../../component/customer/reservation/CardCarousel/CardCarousel.jsx";
import CardImage1 from '../../../../../assets/customer/card.png'
import CardImage2 from '../../../../../assets/customer/card2.png'
import CardImage3 from '../../../../../assets/customer/card3.png'

import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import {useState} from 'react'
const DepositPaymentPage = () => {
    const navigate = useNavigate();
    const price = 50000;
    const cardImages = [
        {index: 0, image: CardImage1},
        {index: 1, image: CardImage2},
        {index: 2, image: CardImage3},
    ]
    const [goToSlide, setGoToSlide] = useState(null)

    const slides = cardImages.map((card) => ({
        key: card.index,
        content: <img src={card.image} onClick={() => setGoToSlide(card.index)} alt={`Card ${card.index}`} />
    }));

    const handleBeforeButtonClick = () => {
        navigate('/customer/reservation/seat-select')
    }
    const handleNextButtonClick = () => {
        navigate('/customer/reservation/fingerprint-auth')
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
                <CardSelectBoxStyled>
                    <Carousel
                    slides={slides}
                    goToSlide={goToSlide}
                    animationConfig={config.gentle}
                    />
                </CardSelectBoxStyled>
            </div>
            <ButtonWrapper>
                <Button onClick={handleBeforeButtonClick} size="short" color={"black"} backgroundColor={theme.color.disabled}>취소</Button>
                <Button onClick={handleNextButtonClick} size="venti">결제</Button>
            </ButtonWrapper>
        </DepositPaymentPageContainer>
    )

}

export default DepositPaymentPage;