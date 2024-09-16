import useTimeSelectStore from "../../../../stores/customer/useTimeSelectStore";
import {TimeSelectModalBoxContainer, TimeSelectModalTitleStyled, TimeSelectModalSubTitleWrapper, TimeSelectModalSubTitleStyled, TimeSelectModalListContainer, TimeSelectModalListItem} from './TimeSelectModalBox'
import Button from "../../../common/button/WEButton/WEButton";
import theme from "../../../../style/common/theme";
const TimeSelectModalBox = () => {
    const {lunchTimes, dinnerTimes, setSelectedStartTime, setSelectedEndTime, setSelectedHeadCount} = useTimeSelectStore();

    const handleHandCountChange = (e) => {
        console.log(typeof e.target.value)
        
        if (e.target.value === '') {
            setSelectedHeadCount(0);
            return;
        }

        if (e.target.value <= 0) {
            alert('0명 이하는 불가능합니다.')
        }
        setSelectedHeadCount(parseInt(e.target.value));
    }
    return (
        <TimeSelectModalBoxContainer>
        <TimeSelectModalTitleStyled>시간을 선택하세요</TimeSelectModalTitleStyled>
        <div>
            <TimeSelectModalSubTitleWrapper>
                <TimeSelectModalSubTitleStyled>오전</TimeSelectModalSubTitleStyled>
            </TimeSelectModalSubTitleWrapper>
            
            <TimeSelectModalListContainer>
                {lunchTimes.map((time, index) => (
                    <TimeSelectModalListItem key={index}>
                        <Button size={'menu'} width={'80%'} height={'70%'} outlined={true} miniOutlined={true} fontSize={theme.fontSize.px11}>{time}</Button>
                    </TimeSelectModalListItem>
                ))}
            </TimeSelectModalListContainer>
        </div>
        <div>
            <TimeSelectModalSubTitleWrapper>
                <TimeSelectModalSubTitleStyled>오후</TimeSelectModalSubTitleStyled>
            </TimeSelectModalSubTitleWrapper>
            <TimeSelectModalListContainer>
                {dinnerTimes.map((time, index) => (
                    <TimeSelectModalListItem key={index}>
                        <Button size={'menu'} width={'80%'} height={'70%'} outlined={true} miniOutlined={true} fontSize={theme.fontSize.px11} key={index}>{time}</Button>
                    </TimeSelectModalListItem>
                ))}
            </TimeSelectModalListContainer>
    
        </div>

        <TimeSelectModalTitleStyled>인원 수를 선택하세요</TimeSelectModalTitleStyled>
        <div>
            <TimeSelectModalSubTitleWrapper>
                <TimeSelectModalSubTitleStyled>인원</TimeSelectModalSubTitleStyled>
                <div><input onChange={handleHandCountChange} type='number'/>명</div>
            </TimeSelectModalSubTitleWrapper>
        </div>
        </TimeSelectModalBoxContainer>
    )
}


export default TimeSelectModalBox