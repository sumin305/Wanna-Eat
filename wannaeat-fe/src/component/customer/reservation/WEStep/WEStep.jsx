import {StepContainer, StepItem, StepCircle, StepLine, TextStyled} from './WEStep'

const WEStep = ({index}) => {
    const stepList = [
        '1. 시간 선택',
        '2. 좌석 선택',
        '3. 예약금 결제',
        '4. 메뉴 선택'
    ]
    return (
        <StepContainer>
          <StepLine/>
          {
          stepList.map((title, idx) => (
            <StepItem key={idx}>
            <StepCircle isActive={index === idx}></StepCircle>
            <TextStyled isActive={index === idx}>{title}</TextStyled>
          </StepItem>
          ))
          }
        </StepContainer>
      );
    };
    
    export default WEStep;