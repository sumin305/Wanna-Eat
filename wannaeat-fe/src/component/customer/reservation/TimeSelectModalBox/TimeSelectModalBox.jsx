import useTimeSelectStore from "../../../../stores/customer/useTimeSelectStore";
import {TimeSelectModalBoxContainer, TimeSelectModalTitleStyled, TimeSelectModalSubTitleWrapper, TimeSelectModalSubTitleStyled, TimeSelectModalListContainer, TimeSelectModalListItem, HeadCountInputWrapper} from './TimeSelectModalBox'
import Button from "../../../common/button/WEButton/WEButton";
import theme from "../../../../style/common/theme";
import useModalStore from "../../../../stores/common/modal/useModalStore";
const TimeSelectModalBox = () => {
    const {lunchTimes, dinnerTimes, setSelectedStartTime, setSelectedEndTime, setSelectedHeadCount} = useTimeSelectStore();
    const {open, setModalType, setAlertText, setIsOneButton} = useModalStore();
    const handleHeadCountChange = (e) => {
        console.log(typeof e.target.value)
        
        if (e.target.value === '') {
            setSelectedHeadCount(0);
            return;
        }

        if (e.target.value <= 0) {
            setIsOneButton(true)
            setModalType('alert');
            setAlertText('0명 이하는 불가능합니다.')
            open();
            setSelectedHeadCount(0);
            return;
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
                        <Button size={'menu'} width={'100%'} height={'70%'} outlined={true} miniOutlined={true} fontSize={theme.fontSize.px11}>{time}</Button>
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
                        <Button size={'menu'} width={'100%'} height={'70%'} outlined={true} miniOutlined={true} fontSize={theme.fontSize.px11} key={index}>{time}</Button>
                    </TimeSelectModalListItem>
                ))}
            </TimeSelectModalListContainer>
    
        </div>

        <TimeSelectModalTitleStyled>인원 수를 선택하세요</TimeSelectModalTitleStyled>
        <div>
            <TimeSelectModalSubTitleWrapper>
                <TimeSelectModalSubTitleStyled>인원</TimeSelectModalSubTitleStyled>
                <HeadCountInputWrapper><input onChange={handleHeadCountChange} type='number'/>명</HeadCountInputWrapper>
            </TimeSelectModalSubTitleWrapper>
        </div>
        </TimeSelectModalBoxContainer>
    )
}


export default TimeSelectModalBox