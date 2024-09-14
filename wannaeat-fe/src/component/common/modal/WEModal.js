import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme';

const HrStyled = styled.hr`
  color: ${theme.color.primary};
  background: ${theme.color.primary};
  height: 2px;
  border: none;
  margin-bottom: 0.5rem;
`;

const ModalTitleWrapper = styled.div`
  margin: 0 1rem;
`;

const ModalTitleStyled = styled.div`
  height: 1.5rem;
`;

const ModalSelectTitleStyled = styled.div`
  font-size: ${theme.fontSize.px15};
`;

const ModalSelectWrapper = styled.div`
  display: flex;
  margin: 0 1rem;
  height: 2.5rem;
  align-items: center;
  justify-content: space-between;
`;

export {
  HrStyled,
  ModalTitleWrapper,
  ModalTitleStyled,
  ModalSelectTitleStyled,
  ModalSelectWrapper,
};
