import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const SheetModalContainer = styled.div`
  background-color: ${theme.color.white};
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.5rem 0;
  border-top-left-radius: ${theme.borderRadius.default};
  border-top-right-radius: ${theme.borderRadius.default};

  @media (min-width: 480px) {
    width: 480px;
    justify-self: center;
  }
`;

export default SheetModalContainer;
