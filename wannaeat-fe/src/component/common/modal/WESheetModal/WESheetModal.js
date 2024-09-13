import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const SheetModalStyled = styled.div`
  z-index: ${theme.zIndex.modal};
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  // height: 14.938rem;
  border-top-left-radius: ${theme.borderRadius.default};
  border-top-right-radius: ${theme.borderRadius.default};
  padding: 1rem 0;
`;

const SheetModalTitleWrapper = styled.div`
  margin: 0 1rem;
`;

const SheetModalTitleStyled = styled.div`
  font-weight: ${theme.fontWeight.bold};
  height: 1.5rem;
`;

const HrStyled = styled.hr`
  color: ${theme.color.primary};
  background: ${theme.color.primary};
  height: 2px;
  border: none;
`;

const SheetModalSelectTitleStyled = styled.div`
  font-size: ${theme.fontSize.px15};
`;

const SheetModalSelectWrapper = styled.div`
  display: flex;
  margin: 0 1rem;
  height: 2.5rem;
  align-items: center;
  justify-content: space-between;
`;
export {
  SheetModalStyled,
  SheetModalTitleStyled,
  HrStyled,
  SheetModalSelectTitleStyled,
  SheetModalSelectWrapper,
  SheetModalTitleWrapper,
};
