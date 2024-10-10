import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const StatisticsStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
  height: 135vh;
  margin-bottom: 10vh;
  flex-shrink: 0;

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 480px) {
    height: 140vh;
    margin-bottom: 10vh;
  }
`;

const StatisticsDonutWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90vw;
  height: 9.625rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  padding: 0;
  margin-top: 2.25rem;

  @media (min-width: 480px) {
    width: 80%;
    height: 12.625rem;
  }
`;

const StatisticsColumnWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90vw;
  height: 14.063rem;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  padding: 0;
  margin-top: 2.25rem;

  @media (min-width: 480px) {
    width: 80%;
    height: 22.125rem;
  }
`;

const StatisticsHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 1.125rem;
  margin-bottom: 0.5rem;

  @media (min-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const TitleStyled = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${theme.fontSize.px15};
  font-weight: ${theme.fontWeight.bold};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px17};
  }
`;

const GoToDetailStyled = styled.div`
  margin-left: auto;
  position: absolute;
  right: 0;
  margin-right: 2%;

  font-size: ${theme.fontSize.px10};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }

  cursor: pointer;
`;

const DonutWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DonutWithLabelStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;

  font-size: ${theme.fontSize.px13};

  label {
    margin-top: 0.2rem;
    font-size: ${theme.fontSize.px15};
  }

  @media (min-width: 480px) {
    width: auto;
    label {
      margin-top: 0.8rem;
      font-size: ${theme.fontSize.px17};
    }
  }
`;

const StatisticsMenuWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90vw;
  height: 16.75rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  padding: 0;
  margin-top: 2.25rem;
  padding-top: 1rem;

  @media (min-width: 480px) {
    width: 80%;
    height: 23.75rem;
    margin-top: 2.25rem;
    padding-top: 1rem;
  }
`;

const MenuHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 1.125rem;
  margin-bottom: 0.375rem;

  @media (min-width: 480px) {
    margin-bottom: 0.563rem;
  }
`;

const WEBestMenuStyled = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`;

export {
  StatisticsStyled,
  StatisticsDonutWrapperStyled,
  StatisticsHeaderStyled,
  MenuHeaderStyled,
  TitleStyled,
  GoToDetailStyled,
  DonutWrapperStyled,
  DonutWithLabelStyled,
  StatisticsColumnWrapperStyled,
  WEBestMenuStyled,
  StatisticsMenuWrapperStyled,
};
