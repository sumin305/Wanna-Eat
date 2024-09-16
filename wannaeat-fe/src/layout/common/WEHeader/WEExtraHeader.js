import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isExtraCarrot ? theme.color.primary : theme.color.white};
  width: 100%;
  height: 3%;
`;

const HeaderText = styled.p`
  color: ${(props) =>
    props.isExtraCarrot ? theme.color.white : theme.color.primary};
  font-size: ${theme.fontSize.px11};
`;

export { HeaderContainer, HeaderText };
