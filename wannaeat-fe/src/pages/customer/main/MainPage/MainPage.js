import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const MainPageContainer = styled.div`
  scrollbar-width: none;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
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
  color: black;
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
