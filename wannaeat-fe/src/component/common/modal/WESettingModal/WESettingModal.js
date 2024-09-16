import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';

const WESettingModalContainer = styled.div`
  background-color: ${theme.color.white};
  position: fixed;
  top: 25%;
  height: 40%;
  width: 100%;
  border-radius: ${theme.borderRadius.default};
  padding: 1rem 0;

  @media (min-width: 480px) {
    width: 480px;
    justify-self: center;
  }
`;

export default WESettingModalContainer;
