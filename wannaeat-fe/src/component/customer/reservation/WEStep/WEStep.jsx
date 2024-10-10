import {StepContainer, StepItemContainer, StepItem, StepCircle, StepLine, TextStyled} from './WEStep'

const WEStep = ({index}) => {
    const stepList = [
        '1. 시간 선택',
        '2. 좌석 선택',
        '3. 예약금 결제',
        '4. 예약 완료'
    ]
    return (
        <StepContainer>
          <StepLine/>
          <StepItemContainer>
          {
          stepList.map((title, idx) => (
            <StepItem key={idx}>
            <StepCircle isActive={index === idx}></StepCircle>
            <TextStyled isActive={index === idx}>{title}</TextStyled>
          </StepItem>
          ))
          }
          </StepItemContainer>
        </StepContainer>
      );
    };
    
    export default WEStep;