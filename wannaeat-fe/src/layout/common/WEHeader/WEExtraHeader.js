import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3%;
  background-color: ${(props) =>
    props.isExtraCarrot ? theme.color.primary : theme.color.white};
`;

const HeaderText = styled.p`
  font-size: ${theme.fontSize.px11};
  color: ${(props) =>
    props.isExtraCarrot ? theme.color.white : theme.color.primary};
`;

export { HeaderContainer, HeaderText };
