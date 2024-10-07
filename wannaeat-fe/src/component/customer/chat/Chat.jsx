import { useEffect, useState } from 'react';
// import useChatStore from 'stores/customer/useChatStore';
import useWebSocketStore from 'stores/customer/useWebSocketStore';
import {
  ChatContainer,
  ChatWrapper,
  ChatMessageBox,
  ChatNickname,
  ChatContent,
  ChatTime,
  ChatInputWrapper,
  ChatInput,
  ChatInputButton,
} from './Chat';

const Chat = () => {
  //   const { chatMessages, setChatMessages } = useChatStore();
  // 채팅메세지 예시
  const [chatMessages, setChatMessages] = useState([
    {
      reservationUrl: 'random1',
      senderReservationParticipantId: 1,
      content: '안녕',
    },
    {
      reservationUrl: 'random1',
      senderReservationParticipantId: 2,
      content: '안녕!',
    },
    {
      reservationUrl: 'random1',
      senderReservationParticipantId: 2,
      content: '어때?',
    },
    {
      reservationUrl: 'random1',
      senderReservationParticipantId: 1,
      content: '좋아!',
    },
  ]);
  const myReservationParticipantId = 2;
  const [chatMessageInput, setChatMessageInput] = useState('');

  const handleChatMessageInputChange = (e) => {
    setChatMessageInput(e.target.value);
  };

  const handleChatMessageSendButtonClick = () => {
    if (!chatMessageInput.trim()) return; // 공백 메시지는 전송하지 않음

    const newMessage = {
      reservationUrl: 'random1',
      senderReservationParticipantId: myReservationParticipantId,
      content: chatMessageInput,
    };

    console.log('전송할 메세지:', newMessage);
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    // setChatMessages(newMessage);
    setChatMessageInput('');
  };
  useEffect(() => {
    console.log('누적채팅:', chatMessages);
  }, [chatMessages]);

  const { stompClient } = useWebSocketStore();

  // stompClient가 초기화되었는지 확인
  if (stompClient) {
    try {
      stompClient.current.send(
        '/api/public/sockets/chats/register',
        {},
        JSON.stringify(newMessage)
      );
    } catch (error) {
      console.log('Error sending message:', error);
    }
  } else {
    console.log('stompClient is not initialized or not connected');
  }

  return (
    <ChatContainer>
      {chatMessages.map((chatMessage, index) => (
        <ChatWrapper
          key={index}
          isMyMessage={
            chatMessage.senderReservationParticipantId ===
            myReservationParticipantId
          }
        >
          <div>
            <ChatNickname
              isMyMessage={
                chatMessage.senderReservationParticipantId ===
                myReservationParticipantId
              }
            >
              {chatMessage.senderReservationParticipantNickname || '소정'}
            </ChatNickname>

            <ChatMessageBox
              isMyMessage={
                chatMessage.senderReservationParticipantId ===
                myReservationParticipantId
              }
            >
              <ChatContent
                isMyMessage={
                  chatMessage.senderReservationParticipantId ===
                  myReservationParticipantId
                }
              >
                {chatMessage.content}
              </ChatContent>
              <ChatTime>{chatMessage.registerTime || '1초 전'}</ChatTime>
            </ChatMessageBox>
          </div>
        </ChatWrapper>
      ))}
      <ChatInputWrapper>
        <ChatInput
          value={chatMessageInput}
          onChange={handleChatMessageInputChange}
          placeholder="메시지를 입력하세요"
        />
        <ChatInputButton onClick={handleChatMessageSendButtonClick}>
          전송
        </ChatInputButton>
      </ChatInputWrapper>
    </ChatContainer>
  );
};

export default Chat;
