import styled from '@emotion/styled';
import theme from 'style/common/theme';

const BlackOutLayout = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndex.blackLayout};
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  @media (min-width: 480px) {
    width: 480px;
    justify-content: center;
  }
`;

const PasswordInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: ${theme.zIndex.password + 1};
  align-items: center;
  width: 100vw;
  height: 100%;
  grid-template-columns: max-content;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  @media (min-width: 480px) {
    width: 480px;
  }
`;

const PasswordTitle = styled.p`
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  @media (min-width: 480px) {
    font-size: 2rem;
  }
`;

const PasswordInputBox = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;
const PasswordCircle = styled.div`
  background: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 100%;
`;

const PasswordKeypadWrapper = styled.div`
  background: #808080;
  display: grid;
  grid-row: 3;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 40vh;
`;

const PasswordKey = styled.div`
  background: white;
  margin: 0.5px;
  border: 2px;
  text-align: center;
  height: 10vh;
  align-content: center;
  font-size: ${theme.fontSize.px21};
  font-weight: bold;
  color: white;
  background: #808080;
`;

export {
  BlackOutLayout,
  PasswordInputContainer,
  PasswordTitle,
  PasswordInputBox,
  PasswordCircle,
  PasswordKeypadWrapper,
  PasswordKey,
};
