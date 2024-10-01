import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useChatStore from 'stores/customer/useChatStore';
import { getChatlist } from 'api/customer/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { validateReservationUrl } from 'api/customer/order';
import {
  DateBox,
  ChatContainer,
  ChatWrapper,
  ChatMessageBox,
  ChatNickname,
  ChatContent,
  ChatTime,
  ChatInputWrapper,
} from 'component/customer/chat/Chat';
import useHeaderStore from 'stores/common/useHeaderStore';
import WETextfield from 'component/common/textfield/WETextfield/WETextfield.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import SendIcon from 'assets/icons/order/send.svg';

const ChatPage = () => {
  const [chatMessageInput, setChatMessageInput] = useState('');
  const {
    isConnected,
    setIsConnected,
    stompClient,
    setStompClient,
    chatMessages,
    setChatPlusMessages,
    setChatMessages,
    setEmptyChatMessages,
    setPrevChatPlusMessages,
    chatPage,
    chatSize,
    setChatPage,
  } = useChatStore();
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setActiveIcons,
    setIsShowBackIcon,
  } = useHeaderStore();

  // 웹소켓 초기 연결
  useEffect(() => {
    setIsCarrot(true);
    setPageName('채팅');
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
    const validateAndConnect = async () => {
      const response = await validateReservationUrl(reservationUrl);

      // reservationUrl 유효성 검사 실행 후 유효한 경우
      if (response.status === 200) {
        // stompClient가 없는 경우에만 소켓 연결 시도
        if (!stompClient) {
          initializeConnection();
        } else {
          console.log('이미 소켓이 연결되어 있습니다.');
        }
      } else {
        // 유효하지 않은 reservationUrl일 경우
        console.log(response.response.data.message);
        nav('/customer/order/notexist', {
          state: { message: response.response.data.message },
        });
      }
    };

    validateAndConnect();
  }, []);

  useEffect(() => {
    // 웹소켓 연결 시 초기 채팅메세지 불러옴
    if (isConnected) {
      fetchChatData();
    }

    // 페이지 언마운트 시 Messages 초기화
    return setEmptyChatMessages([]);
  }, [isConnected]);

  // 초기 채팅 메세지 불러오는 함수
  const fetchChatData = async () => {
    if (isConnected) {
      console.log('연결상태:', isConnected);
      const chatdata = await getChatlist(reservationUrl, chatPage, chatSize);
      console.log(chatdata.data);
      // 초기에 받은 데이터가 최신순이어서 순서를 바꾸고 chatMessages로 넣음
      await setChatMessages(
        chatdata.data.chatMessageDetailResponseDtos.chatMessageDetailResponseDtos.content
          .slice()
          .reverse()
      );
      console.log('zustand chatMessages :', chatMessages);
    } else {
      console.log('채팅 메세지 불러오기 실패');
    }
  };

  const initializeConnection = () => {
    const socket = new SockJS('http://localhost:8080/api/public/ws');
    const client = Stomp.over(socket);

    // 웹소켓 연결
    client.connect(
      {},
      () => {
        console.log('소켓연결');

        // 구독
        client.subscribe('/topic/reservations/random2', (response) => {
          const content = JSON.parse(response.body);
          console.log('Received message: ', content);
          setChatPlusMessages(content);
          console.log(chatMessages);
        });

        setStompClient(client);
        setIsConnected(true);
      },
      (error) => {
        console.log('소켓 연결 오류:', error);
        setIsConnected(false);
      }
    );
  };

  const handleChatMessageInputChange = (e) => {
    setChatMessageInput(e.target.value);
  };

  const myReservationParticipantId = 2;

  const handleChatMessageSendButtonClick = () => {
    if (!chatMessageInput.trim()) return; // 공백 메시지는 전송하지 않음

    const chatMessageRegisterRequestDto = {
      reservationUrl: reservationUrl,
      senderReservationParticipantId: myReservationParticipantId,
      content: chatMessageInput,
    };

    if (stompClient && isConnected) {
      try {
        stompClient.send(
          '/api/public/sockets/chats/register',
          {},
          JSON.stringify(chatMessageRegisterRequestDto)
        );
        console.log('Sent message:', chatMessageInput);

        setChatMessageInput(''); // 메시지 전송 후 입력창 비우기
      } catch (error) {
        console.log('메세지 전송 실패:', error);
      }
    } else {
      console.log('stompClient is not initialized or not connected');
    }
  };

  // 스크롤 위치 감지
  const handleScroll = (e) => {
    const { scrollTop } = e.target;

    // 스크롤이 상단에 도달했을 때
    if (scrollTop === 0) {
      // 이전 채팅 데이터 불러오기
      fetchPrevChatData();
    }
  };

  const fetchPrevChatData = async () => {
    const chatContainer = document.getElementById('chat-container');
    const prevPage = chatPage + 1;
    const chatdata = await getChatlist(reservationUrl, prevPage, chatSize);
    const prevScrollHeight = chatContainer.scrollHeight; // 이전 스크롤 높이 저장
    const prevScrollTop = chatContainer.scrollTop; // 현재 스크롤 위치 저장

    if (chatdata && chatdata.data.chatMessageDetailResponseDtos) {
      // 새로 불러온 데이터를 기존 메시지 앞에 추가
      const prevMessages =
        chatdata.data.chatMessageDetailResponseDtos.chatMessageDetailResponseDtos.content
          .slice()
          .reverse();
      console.log('조회된 메세지', prevMessages);
      if (prevMessages.length === 0) {
        chatContainer.removeEventListener('scroll', handleScroll);
        return;
      }
      setPrevChatPlusMessages(prevMessages);
      setChatPage(prevPage); // 페이지 번호 증가
      console.log('새로운 페이지', prevPage);
      // 새로운 메시지를 추가한 후 스크롤 위치를 유지
      setTimeout(() => {
        const newScrollHeight = chatContainer.scrollHeight;
        chatContainer.scrollTop =
          newScrollHeight - (prevScrollHeight - prevScrollTop);
      }, 0);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');

    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      // 처음 렌더링 시 스크롤을 맨 아래로 이동
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 컴포넌트 언마운트 시 스크롤 이벤트 제거
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatPage]); // chatMessages가 업데이트될 때마다 실행

  // 주문하기 메인페이지로 이동
  const clickGotoOrder = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  // 엔터키로 전송
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleChatMessageSendButtonClick();
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  const showChatTime = (chatTime) => {
    return chatTime.substring(
      chatTime.indexOf('T') + 1,
      chatTime.indexOf('T') + 6
    );
  };

  return (
    <>
      <ChatContainer
        id="chat-container"
        style={{ height: '500px', overflowY: 'scroll' }}
      >
        {chatMessages &&
          chatMessages.map((chat, index) => {
            // 이전 메세지의 날짜와 현재 메세지의 날짜 비교
            const currentMessageDate = formatDate(chat.registerTime);
            const prevMessageDate =
              index > 0
                ? formatDate(chatMessages[index - 1].registerTime)
                : null;
            return (
              <>
                <DateBox key={chat.id}>
                  {currentMessageDate !== prevMessageDate && (
                    <div>
                      <span>-</span>
                      {currentMessageDate}
                      <span>-</span>
                    </div>
                  )}
                </DateBox>
                <ChatWrapper
                  isMyMessage={
                    chat.senderReservationParticipantId ===
                    myReservationParticipantId
                  }
                >
                  <ChatNickname
                    isMyMessage={
                      chat.senderReservationParticipantId ===
                      myReservationParticipantId
                    }
                  >
                    {chat.senderReservationParticipantNickname}
                  </ChatNickname>
                  <ChatMessageBox
                    isMyMessage={
                      chat.senderReservationParticipantId ===
                      myReservationParticipantId
                    }
                  >
                    <ChatContent
                      isMyMessage={
                        chat.senderReservationParticipantId ===
                        myReservationParticipantId
                      }
                    >
                      {chat.content}
                    </ChatContent>
                    <ChatTime
                      isMyMessage={
                        chat.senderReservationParticipantId ===
                        myReservationParticipantId
                      }
                    >
                      {showChatTime(chat.registerTime)}
                    </ChatTime>
                  </ChatMessageBox>
                </ChatWrapper>
              </>
            );
          })}
      </ChatContainer>

      <ChatInputWrapper>
        <input
          value={chatMessageInput}
          onChange={handleChatMessageInputChange}
          placeholder="메시지를 입력하세요"
          onKeyDown={handleKeyPress}
        />
        <WEButton onClick={handleChatMessageSendButtonClick}>
          <img src={SendIcon} alt="전송아이콘" />
        </WEButton>
      </ChatInputWrapper>
      <button onClick={clickGotoOrder}>주문하기 메인페이지 이동</button>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );
};

export default ChatPage;
