import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme';

const HrStyled = styled.hr`
  color: ${theme.color.primary};
  background: ${theme.color.primary};
  height: 2px;
  width: 100%;
  border: none;
  margin-bottom: 0.5rem;
  align-self: center;
`;

const ModalTitleStyled = styled.div`
  font-size: ${(props) => {
    return props.fontSize;
  }};
  font-weight: ${theme.fontWeight.bold};
  height: 1.5rem;
`;

const ModalSelectTitleStyled = styled.div`
  font-size: ${theme.fontSize.px13};
`;

const ModalSelectWrapper = styled.div`
  font-size: ${theme.fontSize.px13};
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: space-between;
`;

const ModalContentWrapper = styled.div`
  padding: 1rem;
`;
export {
  HrStyled,
  ModalTitleStyled,
  ModalSelectTitleStyled,
  ModalSelectWrapper,
  ModalContentWrapper,
};
