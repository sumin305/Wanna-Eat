import { useNavigate } from "react-router-dom";
import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx";
import { ButtonWrapper } from "../TimeSelectPage/TimeSelectPage";
import theme from "../../../../../style/common/theme.js";
import Button from "../../../../../component/common/button/WEButton/WEButton.jsx";
const DepositInfoPage = () => {
    const navigate = useNavigate();
    const price = 50000;
    const handleBeforeButtonClick = () => {
        navigate('/customer/reservation/time-select')
    }
    const handleNextButtonClick = () => {
        navigate('/customer/reservation/deposit-payment')
    }
    return(
        <div>
            <WEStep index={2}/>
            <div><p>{price}</p> <p>원</p></div>
            <div>결제해주세요.</div>
            <ButtonWrapper>
                <Button onClick={handleBeforeButtonClick} size="short" color={"black"} backgroundColor={theme.color.disabled}>이전</Button>
                <Button onClick={handleNextButtonClick} size="venti">예약</Button>
            </ButtonWrapper>
        </div>
    )

}

export default DepositInfoPage;