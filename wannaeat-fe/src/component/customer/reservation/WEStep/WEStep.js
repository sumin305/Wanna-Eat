import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const StepContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 50px;
`;

const StepLine = styled.div`
  position: fixed;
  display: flex;
  z-index: ${theme.zIndex.stepLine};
  background-color: ${theme.color.disabled};
  height: 2px;
  width: 220px;
  margin-bottom: 10px;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  background-color: ${(props) => {
    return props.isActive
      ? `${theme.color.primary}`
      : `${theme.color.disabled}`;
  }};

  margin: 3px 0;
`;

const TextStyled = styled.div`
  font-size: 8px;
  color: ${(props) => {
    return props.isActive
      ? `${theme.color.primary}`
      : `${theme.color.disabled}`;
  }};
`;

//   p.active {
//     color: #f5a623; /* 활성화된 텍스트 색상 */
//   }

export { StepContainer, StepItem, StepCircle, StepLine, TextStyled };
