import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const WESettingModalContainer = styled.div`
  background-color: ${theme.color.white};
  position: fixed;
  top: 25%;
  height: 40%;
  width: 80%;

  border-radius: ${theme.borderRadius.default};
  padding: 0.5rem 0;
  @media (min-width: 480px) {
    width: 400px;
    justify-self: center;
  }

  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;

export { SettingModalContainer, ButtonWrapper };
