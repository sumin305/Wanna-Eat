import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.125rem;
  margin: 0 auto;
  @media (min-width: 480px) {
    width: 25rem;
  }
`;

const StepLine = styled.div`
  position: fixed;
  display: flex;
  z-index: 2;
  background-color: ${theme.color.disabled};
  width: 80%;
  margin: 0 auto;

  margin-bottom: 0.625rem;
  height: 0.125rem;

  @media (min-width: 480px) {
    width: 300px;
  }
`;

const StepItemContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 2;
  justify-content: space-between;
  margin: 0 4%;

  @media (min-width: 480px) {
    width: 350px;
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div`
  width: ${theme.fontSize.px15};
  height: ${theme.fontSize.px15};
  border-radius: 50%;

  background-color: ${(props) => {
    return props.isActive
      ? `${theme.color.primary}`
      : `${theme.color.disabled}`;
  }};

  margin: 0.188rem 0;
`;

const TextStyled = styled.div`
  font-size: ${theme.fontSize.px8};
  color: ${(props) => {
    return props.isActive
      ? `${theme.color.primary}`
      : `${theme.color.disabled}`;
  }};
`;

export {
  StepContainer,
  StepItemContainer,
  StepItem,
  StepCircle,
  StepLine,
  TextStyled,
};
