import styled from '@emotion/styled';
import { theme } from '../../style/common/theme';

const TabbarContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.125rem;
  box-shadow: 1px 0px 4px 0px
    ${() => {
      return theme.colors.disabled || '#ccc';
    }};
  -webkit-tap-highlight-color: transparent;

  p {
    margin: 0;
  }
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);

    outline: none;
  }
`;

const HomeImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.073rem;
`;

const HomeText = styled.p`
  color: ${({ activeTab }) => {
    return activeTab === 0 ? theme.colors.primary : theme.colors.disabled;
  }};

  text-align: center;
  font-size: 0.625rem;
  font-weight: 700;
  padding-bottom: 0.364rem;
`;

const ReservationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);

    outline: none;
  }
`;

const ReservationImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.073rem;
`;

const ReservationText = styled.p`
  color: ${({ activeTab }) => {
    return activeTab === 1 ? theme.colors.primary : theme.colors.disabled;
  }};

  text-align: center;
  font-size: 0.625rem;
  font-weight: 700;
  padding-bottom: 0.364rem;
`;

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);

    outline: none;
  }
`;

const AdminImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.073rem;
`;

const AdminText = styled.p`
  color: ${({ activeTab }) => {
    return activeTab === 2 ? theme.colors.primary : theme.colors.disabled;
  }};

  text-align: center;
  font-size: 0.625rem;
  font-weight: 700;
  padding-bottom: 0.364rem;
`;

const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);

    outline: none;
  }
`;

const StatisticsImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.073rem;
`;

const StatisticsText = styled.p`
  color: ${({ activeTab }) => {
    return activeTab === 3 ? theme.colors.primary : theme.colors.disabled;
  }};

  text-align: center;
  font-size: 0.625rem;
  font-weight: 700;
  padding-bottom: 0.364rem;
`;

export {
  TabbarContainer,
  HomeWrapper,
  ReservationWrapper,
  AdminWrapper,
  StatisticsWrapper,
  HomeImg,
  HomeText,
  ReservationImg,
  ReservationText,
  AdminImg,
  AdminText,
  StatisticsImg,
  StatisticsText,
};
