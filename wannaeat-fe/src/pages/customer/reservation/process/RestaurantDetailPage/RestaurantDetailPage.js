import styled from '@emotion/styled';
import theme from '../../../../../style/common/theme';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RestaurantImageBox = styled.img`
  src: ${(props) => props.src};
  height: 26vh;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.color.primary};
  height: 15vh;
`;

const InformationText = styled.p`
  font-size: ${theme.fontSize.px9};
  color: ${theme.color.white};
  margin: 5px 0;
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
  margin: 5%;
  margin-bottom: 23vh;
`;

const ButtonBox = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.white};
  width: 100%;
  padding: 1rem 0;
`;

export {
  Box,
  RestaurantImageBox,
  InformationContainer,
  InformationText,
  WETabContainer,
  MenuContainer,
  ButtonBox,
};
