import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const SheetModalContainer = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top-left-radius: ${theme.borderRadius.default};
  border-top-right-radius: ${theme.borderRadius.default};
  padding: 1rem 0;

  @media (min-width: 480px) {
    width: 480px;
    justify-self: center;
  }
`;

export default SheetModalContainer;
