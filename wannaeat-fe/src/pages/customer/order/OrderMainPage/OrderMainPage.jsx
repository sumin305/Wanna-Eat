import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import useChatStore from 'stores/customer/useChatStore';
import { validateReservationUrl, getOrderData } from 'api/customer/socket';
import { exitReservation } from 'api/customer/reservation';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useOrderStore from 'stores/customer/useOrderStore';
import useCartStore from 'stores/customer/useCartStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { payDepositPaymentSuccessByKakaoPay } from 'api/common/payment';

import {
  TopBox,
  OrderContainer,
  ButtonWrapper,
} from '../../../../pages/customer/order/OrderMainPage/OrderMainPage.js';
import Logo from 'assets/icons/header/logo.png';
import {
  FoodDiv,
  FoodInfoBottomDiv,
  FoodInfoCountDiv,
  FoodInfoCountP,
  FoodInfoDiv,
  FoodInfoTopDiv,
  FoodPriceP,
  LineDiv,
  MenuContainer,
  MenuDiv,
  MenuImg,
  MenuNameP,
  TextP,
  TotalMenuP,
  TotalPriceDiv,
  TotalPriceP,
  FoodCountWrapper,
  MenuImageWrapper,
  PeopleP,
} from './OrderMainPage.js';
import MenuIcon from 'assets/icons/menu/basic-menu.svg';
import useReservationStore from '../../../../stores/customer/useReservationStore.js';
import useAlert from '../../../../utils/alert.js';

const OrderMainPage = () => {
  const showAlert = useAlert();
  const [activeTab, setActiveTab] = useState(0);
  const [reservationParticipantId, setreservationParticipantId] = useState(0);

  const [orders, setOrders] = useState([]);

  const [myOrders, setMyOrders] = useState([]);

  const [myTotalCnt, setMyTotalCnt] = useState(0);
  const [allTotalCnt, setAllTotalCnt] = useState(0);

  const [myTotalPrice, setMyTotalPrice] = useState(0);
  const [allTotalPrice, setAllTotalPrice] = useState(0);

  const [role, setRole] = useState(null);
  const [isAllPaid, setIsAllPaid] = useState(false);
  const tabs = ['전체 메뉴', '나의 메뉴'];
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
  const { setCartElements } = useCartStore();
  const {
    chatMessages,
    setChatMessages,
    setIsConnected,
    stompClient,
    setStompClient,
    chatPage,
    chatSize,
    setChatPlusMessages,
  } = useChatStore();

  const {
    allOrdersInfo,
    setAllOrdersInfo,
    setReservationDate,
    setReservationStartTime,
    setReservationEndTime,
    setRestaurantId,
    setReservationId,
  } = useOrderStore();

  // 주문 메인페이지에 들어왔을 때 실행
  useEffect(() => {
    // 헤더설정
    setIsCarrot(true);
    setPageName('주문서');
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

    console.log('allOrdersInfo', allOrdersInfo);
  }, []);

  // 모든 주문 데이터 불러오기
  useEffect(() => {
    const validateAndConnect = async () => {
      const response = await validateReservationUrl(reservationUrl);
      console.log('validateAndConnectResponse', response);
      console.log(reservationUrl);
      // reservationUrl 유효성 검사 실행 후 유효한 경우
      if (response.status !== 200) {
        showAlert('유효한 예약 URL이 아닙니다.');
        nav('/customer/order/notexist', {
          state: { message: response.response.data.message },
        });
        return;
      }

      // 참여자 ID 받아서 localStorage에 저장
      const reservationParticipantId =
        response.data.data.reservationParticipantId;

      localStorage.setItem(
        'reservationParticipantId',
        reservationParticipantId
      );

      setreservationParticipantId(reservationParticipantId);

      console.log('stompClient있나 확인', stompClient);
      // WebSocket 연결 후 데이터 불러오기
      if (!stompClient) {
        console.log('stompClient가 없어 소켓 연결을 시도합니다.');
        await initializeConnection(); // WebSocket 연결을 먼저 시도
      }

      const allOrdersInfo = await getOrderData(
        reservationUrl,
        chatPage,
        chatSize
      );

      setAllOrdersInfo(allOrdersInfo ? allOrdersInfo : []);

      const totalData = allOrdersInfo.data;

      // 예약 상태 업데이트
      setReservationDate(totalData.reservationDate);
      setReservationStartTime(totalData.reservationDate);
      setReservationEndTime(totalData.reservationEndTime);
      setRestaurantId(totalData.restaurantId);
      setReservationId(totalData.reservationId);

      // 장바구니 업데이트
      setCartElements(
        totalData.cartDetailResponseDto
          ? totalData.cartDetailResponseDto.cartElements
          : []
      );

      // 주문서 업데이트
      setOrders(
        groupByNicknameWithTotalPrice(
          totalData.orderListResponseDto.orderDetailResponseDtos
        ) || []
      );

      setMyOrders(
        totalData.orderListResponseDto
          ? totalData.orderListResponseDto.orderDetailResponseDtos.filter(
              (order) =>
                Number(order.reservationParticipantId) ===
                Number(reservationParticipantId)
            )
          : []
      );

      // 총 합계 계산
      setMyTotalCnt(
        calculateTotalCnt(
          totalData.orderListResponseDto.orderDetailResponseDtos.filter(
            (order) =>
              Number(order.reservationParticipantId) ===
              Number(reservationParticipantId)
          )
        )
      );
      setAllTotalCnt(
        calculateTotalCnt(
          totalData.orderListResponseDto.orderDetailResponseDtos
        )
      );

      // 총 가격 계산
      setMyTotalPrice(
        totalData.orderListResponseDto.orderDetailResponseDtos
          .filter(
            (order) =>
              Number(order.reservationParticipantId) ===
              Number(reservationParticipantId)
          )
          .reduce((acc, order) => acc + order.totalCnt * order.menuPrice, 0)
      );

      setAllTotalPrice(
        calculateTotalPriceForAll(
          groupByNicknameWithTotalPrice(
            totalData.orderListResponseDto.orderDetailResponseDtos
          )
        )
      );

      // 모든 상품 결제 완료 시 isAllPaid 변경
      const ordersArray = Object.entries(
        groupByNicknameWithTotalPrice(
          totalData.orderListResponseDto.orderDetailResponseDtos
        )
      ).map(([key, value]) => ({
        reservationParticipantNickname: key,
        ...value,
      }));

      console.log('ordersArray', ordersArray);

      const allPaid = Object.values(ordersArray).every((user) =>
        user.orders.every((order) => order.paidCnt === order.totalCnt)
      );

      setIsAllPaid(
        allPaid &&
          Object.keys(
            groupByNicknameWithTotalPrice(
              totalData.orderListResponseDto.orderDetailResponseDtos
            )
          ).length !== 0
      );
    };

    const initializeConnection = async () => {
      return await new Promise((resolve, reject) => {
        console.log('reservationUrl', reservationUrl);
        const socket = new SockJS(
          `${process.env.REACT_APP_REST_API_URL}/api/public/ws`
        );
        const client = Stomp.over(socket);
        client.connect(
          {},
          () => {
            client.subscribe(
              `/topic/reservations/${reservationUrl}`,
              (response) => {
                const content = JSON.parse(response.body);
                console.log('chatMessages 출력', chatMessages);

                console.log('main sumin Received message: ', content);
                if (content.socketType === 'CART') {
                  setCartElements(content.cartElements);
                } else if (content.socketType === 'ORDER') {
                  setCartElements([]);
                } else if (content.socketType === 'CHAT') {
                  console.log('원래 있던 메시지들1', chatMessages);
                  if (chatMessages) {
                    console.log('원래 있던 메시지들2', chatMessages);
                    console.log('새로운 메시지', content);
                    addMessage(content);
                  }
                }
              },
              (error) => {
                console.log('suminerror', error);
              }
            );

            setStompClient(client);
            setIsConnected(true);
            console.log('client', client);
            resolve(); // WebSocket 연결 성공 시 resolve 호출
          },
          (error) => {
            console.log('구독 실패 연결 오류:', error);
            setIsConnected(false);
            reject(error); // WebSocket 연결 실패 시 reject 호출
          }
        );
      });
    };

    // 카카오페이 성공 시 재요청
    const reRequestKakaoPay = async (paymentId, pgToken, type) => {
      const result = await payDepositPaymentSuccessByKakaoPay(
        paymentId,
        pgToken,
        type
      );

      if (result.status === 200) {
        showAlert('결제를 성공했습니다.');
        console.log('result', result);
      } else {
        showAlert('결제에 실패했습니다.');
        return;
      }
    };

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // 카카오페이 후 redirect 되었을 경우,
    if (searchParams.has('status')) {
      // 결제 성공
      if (searchParams.get('status') === 'success') {
        const paymentId = searchParams.get('payment_id');
        const pgToken = searchParams.get('pg_token');
        const type = searchParams.get('type');

        reRequestKakaoPay(paymentId, pgToken, type);
      } else if (searchParams.get('status') === 'fail') {
        showAlert('결제에 실패했습니다.');
        nav('/customer/order/' + params.url);
      } else if (searchParams.get('status') === 'cancel') {
        showAlert('결제가 취소되었습니다.');
        nav('/customer/order/' + params.url);
      }
    }
    validateAndConnect();

    // 모든 상품 결제 완료 시 isAllPaid 변경
    const ordersArray = Object.entries(allOrdersInfo).map(([key, value]) => ({
      reservationParticipantNickname: key,
      ...value,
    }));
    const pendingGroup = groupByNicknameWithTotalPrice(
      ordersArray.filter((order) =>
        order.orders ? order.orders.some((o) => o.totalCnt - o.paidCnt > 0) : []
      )
    );

    const allPaid = Object.values(pendingGroup).every((user) =>
      user.orders.every((order) => order.totalCnt === order.paidCnt)
    );

    setIsAllPaid(allPaid);
  }, []);

  // 새로 온 메세지 추가
  const addMessage = (message) => {
    setChatPlusMessages(message);
  };

  useEffect(() => {
    // 각 변수들 세팅
    console.log('각 변수들 세팅');
    const totalData = allOrdersInfo.data;
    console.log('allOrdersInfo', allOrdersInfo);
    console.log('allOrdersInfo.length', allOrdersInfo.length);
    console.log('orders', orders);
    console.log('totalData', totalData);
    // console.log(
    //   'new Orders',
    //   groupByNicknameWithTotalPrice(
    //     totalData.orderListResponseDto.orderDetailResponseDtos
    //   )
    // );
    // 참여자 ID 받아서 localStorage에 저장
    const reservationParticipantId = localStorage.getItem(
      'reservationParticipantId'
    );

    setMyOrders(
      totalData.orderListResponseDto
        ? totalData.orderListResponseDto.orderDetailResponseDtos.filter(
            (order) =>
              Number(order.reservationParticipantId) ===
              Number(reservationParticipantId)
          )
        : []
    );
    console.log(
      'validate setMyOrders',
      totalData.orderListResponseDto
        ? totalData.orderListResponseDto.orderDetailResponseDtos.filter(
            (order) =>
              Number(order.reservationParticipantId) ===
              Number(reservationParticipantId)
          )
        : []
    );

    console.log(
      'validate setAllOrdersInfo',
      groupByNicknameWithTotalPrice(
        totalData.orderListResponseDto.orderDetailResponseDtos
      )
    );

    setMyTotalCnt(
      calculateTotalCnt(
        totalData.orderListResponseDto.orderDetailResponseDtos.filter(
          (order) =>
            Number(order.reservationParticipantId) ===
            Number(reservationParticipantId)
        )
      )
    );
    console.log(
      'test',
      totalData.orderListResponseDto.orderDetailResponseDtos.filter(
        (order) =>
          Number(order.reservationParticipantId) ===
          Number(reservationParticipantId)
      )
    );
    console.log(
      'validate setMyTotalCnt',
      calculateTotalCnt(
        totalData.orderListResponseDto.orderDetailResponseDtos.filter(
          (order) =>
            Number(order.reservationParticipantId) ===
            Number(reservationParticipantId)
        )
      )
    );

    setAllTotalCnt(
      calculateTotalCnt(totalData.orderListResponseDto.orderDetailResponseDtos)
    );
    console.log(
      'validate setAllTotalCnt',
      calculateTotalCnt(totalData.orderListResponseDto.orderDetailResponseDtos)
    );
    setMyTotalPrice(
      totalData.orderListResponseDto.orderDetailResponseDtos
        .filter(
          (order) =>
            Number(order.reservationParticipantId) ===
            Number(reservationParticipantId)
        )
        .reduce((acc, order) => acc + order.totalCnt * order.menuPrice, 0)
    );
    setAllTotalPrice(
      calculateTotalPriceForAll(
        groupByNicknameWithTotalPrice(
          totalData.orderListResponseDto.orderDetailResponseDtos
        )
      )
    );
  }, [allOrdersInfo]);

  const handleGotoCartButtonClick = () => {
    nav(`/customer/order/cart/${reservationUrl}`);
  };

  const handleOrderSheetButtonClick = () => {
    nav(`/customer/order/order-sheet/${reservationUrl}`);
  };

  // 닉네임 별로 그룹화, 총 금액 구하는 함수
  const groupByNicknameWithTotalPrice = (orders) => {
    return orders.reduce((acc, order) => {
      const nickname = order.reservationParticipantNickname;
      const totalPriceForOrder = order.totalCnt * order.menuPrice;

      if (!acc[nickname]) {
        acc[nickname] = {
          orders: [],
          totalPrice: 0,
        };
      }
      acc[nickname].orders.push(order);
      acc[nickname].totalPrice += totalPriceForOrder;

      return acc;
    }, {});
  };

  // 닉네임 별 합계 금액 계산
  const calculateTotalPriceForAll = (group) => {
    return Object.values(group).reduce(
      (acc, group) => acc + group.totalPrice,
      0
    );
  };

  // totalCnt를 계산하는 함수
  const calculateTotalCnt = (orders) => {
    return orders.reduce((acc, order) => acc + order.totalCnt, 0);
  };

  return (
    <>
      <OrderContainer>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <TopBox>
            <MenuContainer>
              <TotalMenuP>
                총 메뉴 {activeTab === 0 ? allTotalCnt : myTotalCnt}개
              </TotalMenuP>
            </MenuContainer>
          </TopBox>
          <MenuDiv role={role}>
            {activeTab === 0 ? (
              // 전체 메뉴
              <div>
                {Object.entries(orders).map(([nickname, group]) => (
                  <div key={nickname}>
                    <PeopleP>{nickname}</PeopleP>
                    <LineDiv />
                    {Array.isArray(group.orders) && group.orders.length > 0 ? (
                      group.orders.map((order, index) => (
                        <div key={index}>
                          <FoodDiv>
                            <MenuImageWrapper>
                              <MenuImg
                                src={
                                  order.menuImage ? order.menuImage : MenuIcon
                                }
                              />
                            </MenuImageWrapper>
                            <FoodInfoDiv>
                              <FoodInfoTopDiv>
                                <MenuNameP>{order.menuName}</MenuNameP>
                              </FoodInfoTopDiv>
                              <FoodInfoBottomDiv>
                                <FoodInfoCountDiv>
                                  <FoodCountWrapper>
                                    <TextP>미결제 수량:</TextP>
                                    <FoodInfoCountP
                                      isZero={
                                        order.totalCnt - order.paidCnt === 0
                                      }
                                    >
                                      {order.totalCnt - order.paidCnt}
                                    </FoodInfoCountP>
                                  </FoodCountWrapper>
                                  <FoodCountWrapper>
                                    <TextP>총 주문:</TextP>
                                    <FoodInfoCountP>
                                      {order.totalCnt}
                                    </FoodInfoCountP>
                                  </FoodCountWrapper>
                                </FoodInfoCountDiv>
                                <FoodPriceP>
                                  {(
                                    order.totalCnt * order.menuPrice
                                  ).toLocaleString('ko-KR')}{' '}
                                  원
                                </FoodPriceP>
                              </FoodInfoBottomDiv>
                            </FoodInfoDiv>
                          </FoodDiv>
                          <LineDiv />
                        </div>
                      ))
                    ) : (
                      <div>주문이 없습니다.</div>
                    )}

                    <TotalPriceDiv>
                      <TotalPriceP>
                        총:{' '}
                        {group.totalPrice
                          ? group.totalPrice.toLocaleString('ko-KR')
                          : 0}{' '}
                        원
                      </TotalPriceP>
                    </TotalPriceDiv>
                    <br />
                  </div>
                ))}
                <TotalPriceDiv>
                  <TotalPriceP>
                    총: {allTotalPrice.toLocaleString('ko-KR')} 원
                  </TotalPriceP>
                </TotalPriceDiv>
              </div>
            ) : (
              // 나의 메뉴
              <div>
                {myOrders.length > 0 && (
                  <div>
                    {myOrders.map((order, index) => (
                      <div key={index}>
                        <FoodDiv>
                          <MenuImageWrapper>
                            <MenuImg
                              src={order.menuImage ? order.menuImage : MenuIcon}
                              alt="메뉴사진"
                            />
                          </MenuImageWrapper>
                          <FoodInfoDiv>
                            <FoodInfoTopDiv>
                              <MenuNameP>{order.menuName}</MenuNameP>
                            </FoodInfoTopDiv>
                            <FoodInfoBottomDiv>
                              <FoodInfoCountDiv>
                                <FoodCountWrapper>
                                  <TextP>미결제 수량</TextP>
                                  <FoodInfoCountP>
                                    {order.totalCnt - order.paidCnt}
                                  </FoodInfoCountP>
                                </FoodCountWrapper>
                                <FoodCountWrapper>
                                  <TextP>총 주문</TextP>
                                  <FoodInfoCountP>
                                    {order.totalCnt}
                                  </FoodInfoCountP>
                                </FoodCountWrapper>
                              </FoodInfoCountDiv>

                              <FoodPriceP>
                                {(
                                  order.menuPrice * order.totalCnt
                                ).toLocaleString('ko-KR')}
                                원
                              </FoodPriceP>
                            </FoodInfoBottomDiv>
                          </FoodInfoDiv>
                        </FoodDiv>
                        <LineDiv />
                      </div>
                    ))}
                    <TotalPriceDiv>
                      <TotalPriceP>
                        총: {myTotalPrice.toLocaleString('ko-KR')} 원
                      </TotalPriceP>
                    </TotalPriceDiv>
                  </div>
                )}
              </div>
            )}
          </MenuDiv>
        </div>

        {isAllPaid ? (
          <ButtonWrapper>
            <WEButton
              size="medium"
              outlined="true"
              onClick={() =>
                nav(`/customer/order/menu-select/${reservationUrl}`)
              }
            >
              추가주문 하기
            </WEButton>
            <WEButton
              size="medium"
              outlined="true"
              onClick={() => {
                exitReservation(reservationUrl);
                nav(`/customer/order/success`);
              }}
            >
              퇴실하기
            </WEButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <WEButton
              size="medium"
              outlined="true"
              onClick={handleGotoCartButtonClick}
            >
              장바구니 보기
            </WEButton>
            <WEButton
              size="medium"
              outlined="true"
              onClick={handleOrderSheetButtonClick}
            >
              결제하기
            </WEButton>
          </ButtonWrapper>
        )}
      </OrderContainer>
    </>
  );
};

export default OrderMainPage;
