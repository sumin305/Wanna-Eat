import WEStep from "../../../../../component/customer/reservation/WEStep/WEStep.jsx"
import Button from "../../../../../component/common/button/WEButton/WEButton.jsx"
import useTimeSelectStore from "../../../../../stores/customer/useTimeSelectStore"

const SuccessPage = () => {

    const {selectedDate, selectedStartTime, selectedEndTime, selectedHeadCount} = useTimeSelectStore();
    const handleSuccessButtonClick = (e) => {

    }
    return (
        <div>
            <WEStep index={3}/>
            <div>
                <Button size="long" outlined={true} fontWeight={900} >{selectedDate} {selectedStartTime} ~ {selectedEndTime} {selectedHeadCount}명</Button>
            </div>
            <div>
                <Button onClick={handleSuccessButtonClick} size="long">완료하기</Button>
            </div>
        </div>
    )
}

export default SuccessPage