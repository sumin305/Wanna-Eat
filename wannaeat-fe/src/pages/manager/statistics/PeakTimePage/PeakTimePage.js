import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const PeakTimePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150vh;
  margin-bottom: 10vh;

  @media (min-width: 480px) {
    height: 150vh;
    margin-bottom: 10vh;
  }
`;

const PeaKTimePageWrapper = styled.div`
  width: 90%;
  height: 96%;

  padding-inline: 2%;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 480px) {
    width: 95%;
    height: 95%;

    padding-inline: 2%;
  }
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
    width: 14px;
    height: 14px;
  }

  @media (min-width: 480px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 6px;
    margin-bottom: 10px;

    .arrow {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }
  }
`;

const PeakTimeLabelStyled = styled.div`
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
  margin-left: 2%;
  margin-top: 10%;
`;

const DateStyled = styled.div`
  font-size: ${theme.fontSize.px13};
  margin-inline: 10px;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px17};
    margin-inline: 10px;
  }
`;

const DayWrapperStyled = styled.div``;

const TurnoverWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 99%;
  height: 9.688rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff9db;

  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  @media (min-width: 480px) {
    width: 99%;
    height: 9.688rem;
  }
`;

const TurnoverStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  margin-left: 8%;
`;

const TurnoverLabelStyled = styled.div`
  text-align: start;
  margin-inline: 10px;
  font-size: ${theme.fontSize.px23};
  font-weight: ${theme.fontWeight.bold};
`;

const TurnoverValueStyled = styled.div`
  text-align: start;
  font-size: ${theme.fontSize.px40};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.statisticsBlue};
`;

const TimeWrapperStyled = styled.div`
  margin-bottom: 50px;
`;

export {
  PeakTimePageStyled,
  PeaKTimePageWrapper,
  PeakTimeHeaderStyled,
  DateStyled,
  DayWrapperStyled,
  TurnoverWrapperStyled,
  TurnoverStyled,
  TurnoverLabelStyled,
  TurnoverValueStyled,
  PeakTimeLabelStyled,
  TimeWrapperStyled,
  TurnoverContainerStyled,
};
