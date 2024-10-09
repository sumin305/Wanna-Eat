import styled from '@emotion/styled';
import theme from 'style/common/theme';

export const NotExistContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background-color: ${theme.color.lightGray};
  margin: 0% 15%;
`;

export const NotExistText = styled.p`
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
`;
