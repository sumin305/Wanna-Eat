import styled from '@emotion/styled';
import theme from '../../../../../style/common/theme';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RestaurantImageBox = styled.img`
  src: ${(props) => props.src};
  height: 27vh;
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

export { Box, RestaurantImageBox, InformationContainer, InformationText };
