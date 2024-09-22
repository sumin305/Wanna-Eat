import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const MainPageContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  background: ${theme.color.primary};
  border-radius: 0 0 7px 7px;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 90%;
  height: 5vh;
  margin: 0.5rem 0 0.8rem 0;
  padding-left: 0.3rem;
  border-radius: 5px;
  border: none;
  justify-self: center;
  font-size: ${theme.fontSize.px13};

  ::placeholder {
    color: ${theme.color.disabled};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 1.5rem;
  top: 11.3%;
  font-size: 18px;
  @media (min-width: 480px) {
    right: calc(50vw - 240px + 3%);
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
`;

const CategoryImage = styled.img``;

const CategoryName = styled.p`
  font-size: ${theme.fontSize.px9};
  text-align: center;
  height: 0.8rem;
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
`;

const RestaurantTitleButton = styled.button`
  display: flex;
  background: none;
  border: none;
  font-size: ${theme.fontSize.px11};
  font-weight: light;
`;
const RestaurantInfoBox = styled.div`
  margin-right: 1rem;
`;

const RestaurantInfoImage = styled.img`
  border-radius: 5px;
  width: 8rem;
  height: 13vh;
  background: white;
`;

const RestaurantInfoName = styled.p`
  font-size: ${theme.fontSize.px13};
`;
const RestaurantDetailWrapper = styled.div`
  display: flex;
`;
const RestaurantMyReservation = styled.div`
  margin-right: 0.3rem;
  width: 50px;
  letter-spacing: 0;
  border: 1px solid ${theme.color.primary};
  border-radius: 5px;
  height: 2vh;
  font-size: ${theme.fontSize.px8};
  background: white;
  align-content: center;
  text-align: center;
`;
const RestaurantTotalReservation = styled.div`
  margin-right: 0.3rem;
  width: 50px;
  letter-spacing: 0;
  border: 1px solid ${theme.color.accent};
  border-radius: 5px;
  height: 2vh;
  font-size: ${theme.fontSize.px8};
  background: white;
  align-content: center;
  text-align: center;
`;
export {
  MainPageContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
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
  RestaurantTotalReservation,
};
