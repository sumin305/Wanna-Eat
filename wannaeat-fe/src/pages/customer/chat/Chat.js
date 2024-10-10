import styled from '@emotion/styled';
import theme from 'style/common/theme';

export const DateBox = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.color.white};
  font-size: ${theme.fontSize.px13};
  margin: 10px 0;
`;

export const ChatContainer = styled.div`
  background-color: ${theme.color.secondary};
  height: 100vh; /* 전체 화면을 채우도록 설정 */
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ChatTextContainer = styled.div`
  height: ${(props) =>
    props.role ? '85vh' : '95vh'}; /* 입력창을 제외한 높이로 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  margin-bottom: ${(props) => (props.role ? '15vh' : '5vh')};
  scrollbar-width: none;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMyMessage }) =>
    isMyMessage
      ? 'flex-end'
      : 'flex-start'}; // 메시지 박스가 오른쪽 또는 왼쪽으로 정렬되도록 설정
`;

export const ChatMessageBox = styled.div`
  display: flex;
  flex-direction: ${({ isMyMessage }) => (isMyMessage ? 'row-reverse' : 'row')};
  padding: 0 5px;
  margin: 5px;
  max-width: 70%;
`;

export const ChatNickname = styled.p`
  color: ${theme.color.white};
  font-size: ${theme.fontSize.px13};
  font-weight: bold;
  margin: 0 5px;

  text-align: ${({ isMyMessage }) => (isMyMessage ? 'right' : 'left')};
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

export const ChatContent = styled.p`
  background-color: ${({ isMyMessage }) =>
    isMyMessage ? theme.color.accent : theme.color.white};
  font-size: ${theme.fontSize.px15};
  text-align: ${({ isMyMessage }) => (isMyMessage ? 'left' : 'left')};
  padding: 5px 10px;
  border-radius: ${({ isMyMessage }) =>
    isMyMessage ? '10px 10px 0 10px' : '10px 10px 10px 0'};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

export const ChatTime = styled.p`
  color: ${theme.color.white};
  font-size: ${theme.fontSize.px13};
  text-align: ${({ isMyMessage }) => (isMyMessage ? 'right' : 'left')};
  align-self: end;
  margin: 0 3px;
`;

export const ChatInputWrapper = styled.div`
  position: relative;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.role ? '10vh' : '')};
  @media (min-width: 480px) {
    width: 480px;
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 5vh;
  border: none;
  padding-left: 0.5rem;
`;

export const ChatInputButton = styled.button`
  position: absolute;
  right: 0;
  margin: 3px;
  background: ${theme.color.primary};
  border-radius: 5px;
  width: 2rem;
  height: 4vh;
  @media (min-width: 480px) {
    width: 5rem;
    height: 4vh;
  }
`;
