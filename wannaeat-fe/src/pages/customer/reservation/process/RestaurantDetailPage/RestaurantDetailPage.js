import styled from '@emotion/styled';
import theme from '../../../../../style/common/theme';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RestaurantImageBox = styled.img`
  height: 26vh;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.color.primary};
  height: 15vh;
  padding: 0 3%;
  border-radius: 0 0 7px 7px;
`;

const InformationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InformationText = styled.p`
  font-size: ${theme.fontSize.px10};
  color: ${theme.color.white};
  margin: 1% 0;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px11};
  }
`;

const IconImg = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 0.3rem;
`;

const WETabContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${theme.color.white};
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin-top: 3%;
  margin-bottom: 23vh;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 2% 5%;
  border: 2px solid ${theme.color.disabled};
  border-radius: ${theme.borderRadius.px15};
`;

const ImageBox = styled.div`
  overflow: hidden;
  left: 0;
  width: 7rem;
  height: 7rem;
  flex-shrink: 0;
`;

const MenuImg = styled.img`
  src: ${(props) => props.src};
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  border-radius: ${theme.borderRadius.px15};
`;

const MenuContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4%;
`;

const MenuName = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: bold;
`;

const MenuPrice = styled.p`
  font-size: ${theme.fontSize.px13};
  margin: 8px 0;
`;

const MenuDescription = styled.p`
  font-size: ${theme.fontSize.px11};
`;

const ButtonBox = styled.div`
  display: flex;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.white};
  width: 100%;
  padding: 1rem 0;

  @media (min-width: 480px) {
    width: 480px;
  }
`;

export {
  Box,
  RestaurantImageBox,
  InformationContainer,
  InformationWrapper,
  InformationText,
  IconImg,
  WETabContainer,
  MenuContainer,
  MenuBox,
  ImageBox,
  MenuImg,
  MenuContentContainer,
  MenuName,
  MenuPrice,
  MenuDescription,
  ButtonBox,
};
