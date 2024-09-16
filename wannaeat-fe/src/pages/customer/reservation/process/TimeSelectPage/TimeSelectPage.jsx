import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx"
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx'
import theme from "../../../../../style/common/theme.js"
import {TimeSelectPageContainer, ButtonWrapper, CalendarWrapper, CalendarStyled} from './TimeSelectPage.js'
import useModalStore from "../../../../../stores/common/modal/useModalStore.js"
import TimeSelectModalBox from "../../../../../component/customer/reservation/TimeSelectModalBox/TimeSelectModalBox.jsx"
import useTimeSelectStore from "../../../../../stores/customer/useTimeSelectStore.js"
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

const TimeSelectPage = () => {
    const {open, setModalType, setConfirmText, setTitle, setChildren} = useModalStore();
    const {selectedDate, selectedStartTime, selectedEndTime, selectedHeadCount, setSelectedDate, setSelectedStartTime, setSelectedEndTime} = useTimeSelectStore();
    const handleTimeSelectButtonClick = () => {
        setModalType('sheet')
        setConfirmText('확인')
        setTitle('예약 정보 입력')
        setChildren(<TimeSelectModalBox />)
        open()
    }

    const handleDateChange = (date) => {
        setSelectedDate(moment(date).format('MM.DD'))
        setSelectedStartTime('00:00')
        setSelectedEndTime('00:00')
    }
    return(
        <TimeSelectPageContainer>
            <WEStep index={0}/>
            <div>
                <Button size="long" outlined={true} onClick={handleTimeSelectButtonClick} fontWeight={900} >{selectedDate} {selectedStartTime} ~ {selectedEndTime} {selectedHeadCount}명</Button>
                <CalendarWrapper>
                    <CalendarStyled showNeighboringMonth={false} onChange={handleDateChange} value={new Date()} formatDay={(locale, date) => moment(date).format("DD")}/>
                </CalendarWrapper>
            </div>
            <ButtonWrapper>
                <Button size="short" color={"black"} backgroundColor={theme.color.disabled}>이전</Button>
                <Button size="venti">예약</Button>
            </ButtonWrapper>

        </TimeSelectPageContainer>
    )
}

export default TimeSelectPage