import { useState } from 'react';
import {
  ChatContainer,
  ChatWrapper,
  ChatMessageBox,
  ChatNickname,
  ChatContent,
  ChatTime,
  ChatInputWrapper,
} from './Chat';

const Chat = ({ stompClient, reservationUrl }) => {
  const [chatMessages, setChatMessages] = useState([
    // 초기 채팅 메시지 예시
    {
      reservationUrl: 'random2',
      senderReservationParticipantId: 1,
      content: '안녕',
    },
    {
      reservationUrl: 'random2',
      senderReservationParticipantId: 2,
      content: '안녕!',
    },
  ]);

  const myReservationParticipantId = 2; // 나의 참여자 ID
  const [chatMessageInput, setChatMessageInput] = useState('');

  // 메시지 입력 핸들러
  const handleChatMessageInputChange = (e) => {
    setChatMessageInput(e.target.value);
  };

  // 메시지 전송 핸들러
  const handleChatMessageSendButtonClick = () => {
    if (!chatMessageInput.trim()) return; // 공백 메시지 전송 방지

    const newMessage = {
      reservationUrl: reservationUrl,
      senderReservationParticipantId: myReservationParticipantId,
      content: chatMessageInput,
    };

    // 서버로 메시지 전송
    if (stompClient) {
      stompClient.send(
        '/api/public/sockets/chats/register', // 메시지를 보낼 endpoint
        {},
        JSON.stringify(newMessage) // 메시지 전송
      );
      console.log('메시지 전송:', newMessage);
    }

    // 로컬 메시지 목록에 추가
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setChatMessageInput(''); // 입력 필드 초기화
  };

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
        <input
          value={chatMessageInput}
          onChange={handleChatMessageInputChange}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleChatMessageSendButtonClick}>전송</button>
      </ChatInputWrapper>
    </ChatContainer>
  );
};

export default Chat;
