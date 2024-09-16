import styled from '@emotion/styled/macro';

const StepContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 8px;
`;

// const circle.active {
//     background-color: #f5a623;
//   }

const StepLine = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: #ddd;
  margin: 0 10px;
`;

const TextStyled = styled.div`
  font-size: 12px;
  color: #ddd;
`;

//   p.active {
//     color: #f5a623; /* 활성화된 텍스트 색상 */
//   }

export { StepContainer, StepItem, StepCircle, StepLine, TextStyled };
