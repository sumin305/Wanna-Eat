import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
`;

const SearchWrapper = styled.div`
  position: relative;
  background: ${theme.color.primary};
  border-radius: 0 0 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  margin: 0 1rem;
  height: 5vh;
  padding-left: 0.3rem;
  padding-right: 3rem;
  border-radius: 5px;
  border: none;
  font-size: ${theme.fontSize.px13};
  margin-bottom: 1rem;
  ::placeholder {
    color: ${theme.color.disabled};
  }
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 1.5rem;
  height: 3vh;
  border: none;
  border-radius: 5px;
  font-size: ${theme.fontSize.px13};
  cursor: pointer;
  color: white;
  transform: translateY(-50%);
  margin-top: 3px;
`;

const ReservationDateWrapper = styled.div``;

const ReservationAlertDate = styled.p`
  color: ${theme.color.secondary};
  font-size: ${theme.fontSize.px13};
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;
const ReservationAlertTime = styled.p`
  display: flex;
  align-items: center;
`;
const ReservationLastTime = styled.p`
  color: ${theme.color.primary};
  font-weight: 900;
  font-size: 1.7rem;
  margin-right: 0.5rem;

  @media (min-width: 480px) {
    font-size: 3rem;
  }
`;
const ReservationTimeInfo = styled.p`
  font-size: ${theme.fontSize.px13};
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const ReservationiInfoButtonWrapper = styled.div`
  display: flex;
  align-self: end;
  margin: 0 1rem;
`;
const ReservationInfoButton = styled.button`
  background: none;
  border: none;
  color: ${theme.color.secondary};
`;
const ReservationAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff9db;
  height: 8rem;
  place-content: center;
  align-items: center;

  @media (min-width: 480px) {
    height: 9rem;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  height: 20vh;
  background: #fff9db;
  margin: 0.5rem 0;
  justify-content: space-evenly;
`;

const BannerImage = styled.img`
  margin: 1rem;
`;

const BannerRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 17vh;
  align-self: center;
  margin: 0.5rem;
  justify-content: center;
`;

const BannerTitle = styled.p`
  color: ${theme.color.primary};
  font-weight: bold;
  font-size: ${theme.fontSize.px17};
  text-align: right;
  margin-bottom: 0.5rem;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px21};
  }
`;

const BannerButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: ${theme.color.secondary};
  text-align: right;
  font-weight: 100;
  font-size: ${theme.fontSize.px11};
  justify-content: right;
  align-items: center;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;
const CategoryWrapper = styled.div``;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
`;

const CategoryTitle = styled.div`
  font-size: ${theme.fontSize.px13};
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

const CategoryImage = styled.img``;

const CategoryName = styled.p`
  font-size: ${theme.fontSize.px9};
  text-align: center;
  height: 0.8rem;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px11};
  }
`;
const RestaurantWrapper = styled.div`
  background: ${theme.color.gray};
  margin: 1rem 0;
  scroll-behavior: smooth;

  > * {
    margin: 1rem;
  }
`;

const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RestaurantInfoContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  scrollbar-width: none;
`;

const RestaurantTitle = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

const RestaurantTitleButton = styled.button`
  color: black;
  display: flex;
  background: none;
  border: none;
  font-size: ${theme.fontSize.px11};
  font-weight: light;
  align-items: center;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;
const RestaurantInfoBox = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const RestaurantInfoImage = styled.img`
  border-radius: 5px;
  height: 13vh;
  width: 130px;
  background: white;
`;

const RestaurantInfoName = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: bold;
  margin: 0.2rem 0;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;
const RestaurantDetailWrapper = styled.div`
  display: flex;
`;
const RestaurantMyReservation = styled.div`
  padding: 3px;
  margin-right: 0.3rem;
  letter-spacing: 0;
  border: 2px solid ${theme.color.primary};
  border-radius: 5px;
  font-size: ${theme.fontSize.px8};
  font-weight: bold;
  background: white;
  align-content: center;
  text-align: center;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px10};
  }
`;

const RestaurantInfoWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
}
`;
export {
  MainPageContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  ReservationDateWrapper,
  ReservationAlertDate,
  ReservationAlertTime,
  ReservationLastTime,
  ReservationTimeInfo,
  ReservationiInfoButtonWrapper,
  ReservationInfoButton,
  ReservationAlertWrapper,
  BannerWrapper,
  BannerImage,
  BannerRightWrapper,
  BannerTitle,
  BannerButton,
  CategoryWrapper,
  CategoryTitle,
  CategoryContainer,
  CategoryImage,
  CategoryName,
  RestaurantWrapper,
  RestaurantHeader,
  RestaurantInfoContainer,
  RestaurantTitle,
  RestaurantTitleButton,
  RestaurantInfoBox,
  RestaurantInfoImage,
  RestaurantInfoName,
  RestaurantDetailWrapper,
  RestaurantMyReservation,
  RestaurantInfoWrapper,
};
