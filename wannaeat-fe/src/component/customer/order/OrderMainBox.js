import styled from '@emotion/styled';
import theme from 'style/common/theme';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

export const CheckBox = styled.div`
  display: flex;
  margin-left: 4%;
`;

export const CheckText = styled.p`
  font-size: ${theme.fontSize.px13};
`;
