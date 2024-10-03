import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const PeakTimePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (min-width: 480px) {
    height: 140vh;
    margin-bottom: 10vh;
  }
`;

const PeaKTimePageWrapper = styled.div`
  width: 95%;
  height: 95%;

  padding-inline: 2%;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const PeakTimeHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  margin-bottom: 15px;

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

const DayWrapperStyled = styled.div``;

const TurnoverWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;

  width: 14.08688rem;
  height: 9.625rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  @media (min-width: 480px) {
    width: 99%;
    height: 12.625rem;
  }
`;

const TurnoverStyled = styled.div`
  width: 100%;
  height: 100%;
  margin-inline: 10px;
  font-size: ${theme.fontSize.px23};
`;

export {
  PeakTimePageStyled,
  PeaKTimePageWrapper,
  PeakTimeHeaderStyled,
  DateStyled,
  DayWrapperStyled,
  TurnoverWrapperStyled,
  TurnoverStyled,
};
