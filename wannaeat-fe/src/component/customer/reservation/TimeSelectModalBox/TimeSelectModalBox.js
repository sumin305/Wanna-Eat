import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const TimeSelectModalBoxContainer = styled.div`
  > * {
    padding: 0.2rem 0;
  }
`;
const TimeSelectModalTitleStyled = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: ${theme.fontWeight.bold};
`;
const TimeSelectModalSubTitleWrapper = styled.div`
  display: flex;
  padding: 0.2rem;
  font-weight: ${theme.fontWeight.light};
  justify-content: space-between;
`;
const TimeSelectModalSubTitleStyled = styled.p`
  display: flex;
  font-size: ${theme.fontSize.px11};
`;
const TimeSelectModalListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  //   height: 100px;
  font-size: ${theme.fontSize.px11};
  gap: 3px 10px;
`;

const TimeSelectModalListItem = styled.div`
  height: 35px;
`;

const HeadCountInputWrapper = styled.div`
  > * {
    margin: 0 5px;
  }
`;
export {
  TimeSelectModalBoxContainer,
  TimeSelectModalTitleStyled,
  TimeSelectModalSubTitleWrapper,
  TimeSelectModalSubTitleStyled,
  TimeSelectModalListContainer,
  TimeSelectModalListItem,
  HeadCountInputWrapper,
};
