import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const PeakTimePageStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const PeakTimeHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 10px;

  .arrow {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

const DateStyled = styled.div`
  font-size: ${theme.fontSize.px17};
  margin-inline: 10px;
`;

export { PeakTimePageStyled, PeakTimeHeaderStyled, DateStyled };
