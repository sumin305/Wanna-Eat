import { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useChatStore from 'stores/customer/useChatStore';
import { getChatlist, getChats } from 'api/customer/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { validateReservationUrl } from 'api/customer/socket';
import {
  DateBox,
  ChatContainer,
  ChatWrapper,
  ChatMessageBox,
  ChatNickname,
  ChatContent,
  ChatTime,
  ChatInputWrapper,
  ChatInput,
  ChatTextContainer,
  ChatInputButton,
} from 'pages/customer/chat/Chat.js';
import useHeaderStore from 'stores/common/useHeaderStore';
import WETextfield from 'component/common/textfield/WETextfield/WETextfield.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import SendIcon from 'assets/icons/order/send.svg';

const ChatPage = () => {
  const [myReservationParticipantId, setMyReservationParticipantId] =
    useState(0);

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
    setIconAction,
  } = useHeaderStore();
  const messageEndRef = useRef(null);
  const [isTop, setIsTop] = useState(false);
  const [role, setRole] = useState(null);

  // 웹소켓 초기 연결
  useEffect(() => {
    setIsCarrot(true);
    setPageName('채팅');
    setIsShowLogo(false);
    setIsShowBackIcon(true);

    // localStorage에서 role 가져오기
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    const gotoChat = () => {
      nav(`/customer/order/chat/${reservationUrl}`);
    };
    const gotoSelectMenu = () => {
      nav(`/customer/order/menu-select/${reservationUrl}`);
    };
    setActiveIcons([8, 10]);
    setIconAction([gotoSelectMenu, gotoChat]);

    const validateAndConnect = async () => {
      if (!stompClient) {
        initializeConnection();
      } else {
        console.log('이미 소켓이 연결되어 있습니다.');
      }
    };
    validateAndConnect();
    setMyReservationParticipantId(
      localStorage.getItem('reservationParticipantId')
    );
  }, []);

  const initializeConnection = () => {
    const socket = new SockJS(
      `${process.env.REACT_APP_REST_API_URL}/api/public/ws`
    );
    const client = Stomp.over(socket);

    // 웹소켓 연결
    client.connect(
      {},
      () => {
        console.log('소켓연결');

        // 구독
        client.subscribe(
          `/topic/reservations/${reservationUrl}`,
          (response) => {
            const content = JSON.parse(response.body);
            console.log('soom chat Received message: ', content);
            setChatPlusMessages(content);
            console.log(chatMessages);
          }
        );

        setStompClient(client);
        setIsConnected(true);
      },
      (error) => {
        console.log('소켓 연결 오류:', error);
        setIsConnected(false);
      }
    );
  };
  // 초기 채팅 메세지 불러오는 함수
  const fetchChatData = async () => {
    if (isConnected) {
      const chatResult = await getChats(reservationUrl, 0, 20);
      const chats = chatResult.data.data.chatMessageDetailResponseDtos;
      if (chatResult) {
        // 초기에 받은 데이터가 최신순이어서 순서를 바꾸고 chatMessages로 넣음
        console.log(
          'chatdata.data.chatMessageListResponseDto.chatMessageDetailResponseDtos.content',
          chats.content
        );
        setChatMessages(chats.content.reverse());
        console.log('zustand chatMessages :', chatMessages);
      } else {
        console.log('채팅 데이터 없음');
      }
    } else {
      console.log('채팅 메세지 불러오기 실패');
    }
  };

  useEffect(() => {
    // 웹소켓 연결 시 초기 채팅메세지 불러옴
    if (isConnected) {
      fetchChatData();
    }
  }, []);

  const handleChatMessageInputChange = (e) => {
    setChatMessageInput(e.target.value);
  };

  // 버튼으로 전송
  const handleChatMessageSendButtonClick = () => {
    if (!chatMessageInput.trim()) return; // 공백 메시지는 전송하지 않음

    const messageToSend = chatMessageInput; // 전송할 메시지 저장
    sendSocketMessage(messageToSend); // 메시지 전송 후
    setChatMessageInput(''); // 메시지 입력 필드를 비웁니다
  };

  // 엔터로 전송
  const handleKeyPress = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    // isComposing이 true일 때, 얼리 리턴을 통해 함수가 종료되도록 함.

    if (e.key === 'Enter') {
      e.preventDefault();
      const messageToSend = chatMessageInput; // 전송할 메시지 저장
      sendSocketMessage(messageToSend); // 메시지 전송 후
      setChatMessageInput(''); // 메시지 입력 필드를 비웁니다
    }
  };

  // 소켓을 통해 메시지 전송
  const sendSocketMessage = async (message) => {
    if (!message.trim()) return; // 공백 메시지 방지

    const chatMessageRegisterRequestDto = {
      reservationUrl: reservationUrl,
      senderReservationParticipantId: myReservationParticipantId,
      content: message,
    };

    console.log('stompClient', stompClient);
    console.log('isConnected', isConnected);

    if (stompClient && isConnected) {
      try {
        await stompClient.send(
          '/api/public/sockets/chats/register',
          {},
          JSON.stringify(chatMessageRegisterRequestDto)
        );
        console.log('Sent message:', message);
      } catch (error) {
        console.log('메세지 전송 실패:', error);
      }
    } else {
      console.log('stompClient is not initialized or not connected');
    }
  };
  // 주문하기 메인페이지로 이동
  const clickGotoOrder = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  // 스크롤 위치 감지
  const handleScroll = async (e) => {
    const { scrollTop } = e.target;

    // 스크롤이 상단에 도달했을 때
    if (scrollTop === 0) {
      console.log('scrollTop');
      // 이전 채팅 데이터 불러오기
      const chatContainer = document.getElementById('chat-container');
      const prevScrollHeight = chatContainer.scrollHeight; // 이전 스크롤 높이 저장
      console.log('prevScrollHeight', prevScrollHeight);
      await fetchPrevChatData();
      chatContainer.scrollTop = chatContainer.scrollHeight - prevScrollHeight;
    }
  };

  const fetchPrevChatData = async () => {
    const prevPage = chatPage; // 현재 페이지 저장
    setChatPage(prevPage + 1); // 상태 업데이트
    const chatContainer = document.getElementById('chat-container');

    console.log(
      'reservationUrl, chatPage, chatSize',
      reservationUrl,
      chatPage,
      chatSize
    );
    const chatdata = await getChats(reservationUrl, chatPage, chatSize);

    // 데이터 응답이 정상적인지 확인
    if (chatdata.status !== 200) {
      console.error('데이터를 불러오는 데 실패했습니다.');
      return;
    }

    const newMessages =
      chatdata.data.data.chatMessageDetailResponseDtos.content;

    if (!newMessages || newMessages.length === 0) {
      console.log('더 이상 가져올 메시지가 없습니다.');
      chatContainer.scrollTop = chatContainer.scrollHeight;
      setChatPage(0); // 상태 업데이트
      return;
    }

    const reversedNewMessages = newMessages.reverse();

    // 이전 메시지 앞에 새 메시지 추가
    setChatMessages([...reversedNewMessages, ...chatMessages]);

    setIsTop(false);
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

  // 메세지가 오면 가장 하단으로
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('chatMessages :', chatMessages);
  }, [chatMessages]);

  return (
    <ChatContainer>
      <ChatTextContainer id="chat-container" role={role}>
        {Array.isArray(chatMessages) &&
          chatMessages.length > 0 &&
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
                    Number(chat.senderReservationParticipantId) ===
                    Number(myReservationParticipantId)
                  }
                  key={chat.id}
                >
                  <ChatNickname
                    isMyMessage={
                      Number(chat.senderReservationParticipantId) ===
                      Number(myReservationParticipantId)
                    }
                  >
                    {chat.senderReservationParticipantNickname}
                  </ChatNickname>
                  <ChatMessageBox
                    isMyMessage={
                      Number(chat.senderReservationParticipantId) ===
                      Number(myReservationParticipantId)
                    }
                  >
                    <ChatContent
                      isMyMessage={
                        Number(chat.senderReservationParticipantId) ===
                        Number(myReservationParticipantId)
                      }
                    >
                      {chat.content}
                    </ChatContent>
                    <ChatTime
                      isMyMessage={
                        Number(chat.senderReservationParticipantId) ===
                        Number(myReservationParticipantId)
                      }
                    >
                      {showChatTime(chat.registerTime)}
                    </ChatTime>
                  </ChatMessageBox>
                </ChatWrapper>
              </>
            );
          })}
        <div ref={messageEndRef}></div>
      </ChatTextContainer>
      <ChatInputWrapper role={role}>
        <ChatInput
          value={chatMessageInput}
          onChange={handleChatMessageInputChange}
          placeholder="메시지를 입력하세요"
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <ChatInputButton onClick={handleChatMessageSendButtonClick}>
          <img src={SendIcon} alt="전송아이콘" />
        </ChatInputButton>
      </ChatInputWrapper>
    </ChatContainer>
  );
};

export default ChatPage;
