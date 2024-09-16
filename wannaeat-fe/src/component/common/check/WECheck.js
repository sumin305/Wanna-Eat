import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

export const CheckContainer = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.313rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }) =>
    type === 'checkClickCarrot' ? theme.color.primary : theme.color.white};
  border: ${({ type }) =>
    type === 'checkClickCarrot'
      ? `1px solid ${theme.color.primary}`
      : `1px solid ${theme.color.disabled}`};
`;

export const CheckImg = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;
