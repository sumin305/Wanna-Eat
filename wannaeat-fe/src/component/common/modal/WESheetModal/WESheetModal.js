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
  SheetModalContainer,
  SheetModalTitleStyled,
  HrStyled,
  SheetModalSelectTitleStyled,
  SheetModalSelectWrapper,
  SheetModalTitleWrapper,
};
