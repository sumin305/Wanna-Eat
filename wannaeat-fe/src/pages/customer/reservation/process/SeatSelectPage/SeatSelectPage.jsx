import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx";
import { ButtonWrapper } from "../TimeSelectPage/TimeSelectPage";
import theme from "../../../../../style/common/theme";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../component/common/button/WEButton/WEButton.jsx";

const SeatSelectPage = () => {

    const navigate = useNavigate();

    const handleBeforeButtonClick = () => {
        navigate('/customer/reservation/time-select')
    }
    const handleNextButtonClick = () => {
        navigate('/customer/reservation/deposit-payment')
    }
    return(
        <div>
            <WEStep index={1}/>
            <ButtonWrapper>
                <Button onClick={handleBeforeButtonClick} size="short" color={"black"} backgroundColor={theme.color.disabled}>이전</Button>
                <Button onClick={handleNextButtonClick} size="venti">예약</Button>
            </ButtonWrapper>
        </div>
    )

}

export default SeatSelectPage;