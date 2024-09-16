import {StepContainer, StepItem, StepCircle, StepLine, TextStyled} from './WEStep'

const WEStep = (idx) => {
    return (
        <StepContainer>
          <StepItem>
            <StepCircle></StepCircle>
            <TextStyled>1. 시간 선택</TextStyled>
          </StepItem>
          <StepLine></StepLine>
          <StepItem>
            <StepCircle></StepCircle>
            <TextStyled>2. 좌석 선택</TextStyled>
          </StepItem>
          <StepLine></StepLine>
          <StepItem>
            <StepCircle></StepCircle>
            <TextStyled>3. 예약금 결제</TextStyled>
          </StepItem>
          <StepLine></StepLine>
          <StepItem>
            <StepCircle></StepCircle>
            <TextStyled>4. 메뉴 선택</TextStyled>
          </StepItem>
        </StepContainer>
      );
    };
    
    export default WEStep;