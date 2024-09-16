import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx"
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx'
import theme from "../../../../../style/common/theme.js"
import {TimeSelectPageContainer, ButtonWrapper} from './TimeSelectPage.js'
import useModalStore from "../../../../../stores/modal/useModalStore.js"

const TimeSelectPage = () => {
    const selectedDate = '09.06'
    const selectedStartTime = '19:00'
    const selectedEndTime = '20:00'
    const selectedHeadCount = 2
    const {open, setModalType} = useModalStore();

    const handleTimeSelectButtonClick = e => {
        setModalType('sheet')
        open()
    }
    return(
        <TimeSelectPageContainer>
            <WEStep index={0}/>
            <div>
            <Button size="long" outlined={true} onClick={handleTimeSelectButtonClick}>{selectedDate} {selectedStartTime} ~ {selectedEndTime} {selectedHeadCount}명</Button>
            <ButtonWrapper>
                <Button size="short" color={"black"} backgroundColor={theme.color.disabled}>이전</Button>
                <Button size="venti">예약</Button>
            </ButtonWrapper>

            </div>
        </TimeSelectPageContainer>
    )
}

export default TimeSelectPage