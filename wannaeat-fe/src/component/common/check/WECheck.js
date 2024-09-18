import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const CheckContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }) =>
    type === 'checkClickCarrot' ? theme.color.primary : theme.color.white};
  width: 1.25rem;
  height: 1.25rem;
  border: ${({ type }) =>
    type === 'checkClickCarrot'
      ? `1px solid ${theme.color.primary}`
      : `1px solid ${theme.color.disabled}`};
  border-radius: ${theme.borderRadius.px5};
`;

const CheckImg = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;

export { CheckContainer, CheckImg };
