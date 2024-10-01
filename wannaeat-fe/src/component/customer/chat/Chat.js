import styled from '@emotion/styled';
import theme from 'style/common/theme';

export const DateBox = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.color.white};
  font-size: ${theme.fontSize.px9};
  margin: 10px 0;
`;

export const ChatContainer = styled.div`
  height: 100%;
  background-color: ${theme.color.secondary};
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
  padding: 5px;
  max-width: 70%;
`;

export const ChatNickname = styled.p`
  color: ${theme.color.white};
  font-size: ${theme.fontSize.px10};
  text-align: ${({ isMyMessage }) => (isMyMessage ? 'right' : 'left')};
`;

export const ChatContent = styled.p`
  background-color: ${({ isMyMessage }) =>
    isMyMessage ? theme.color.accent : theme.color.white};
  font-size: ${theme.fontSize.px15};
  text-align: ${({ isMyMessage }) => (isMyMessage ? 'left' : 'left')};
  padding: 5px 10px;
  border-radius: ${({ isMyMessage }) =>
    isMyMessage ? '10px 10px 0 10px' : '10px 10px 10px 0'};
`;

export const ChatTime = styled.p`
  color: ${theme.color.white};
  font-size: ${theme.fontSize.px10};
  text-align: ${({ isMyMessage }) => (isMyMessage ? 'right' : 'left')};
  align-self: end;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  background-color: ${theme.color.secondary};
  width: 100%;
`;
