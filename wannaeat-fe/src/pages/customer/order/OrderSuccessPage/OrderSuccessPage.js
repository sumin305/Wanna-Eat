import styled from '@emotion/styled';
import theme from 'style/common/theme';

const OrderEndContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background-color: ${theme.color.lightGray};
  margin: 0% 15%;
`;

const OrderEndText = styled.p`
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
`;

export { OrderEndContainer, OrderEndText };
