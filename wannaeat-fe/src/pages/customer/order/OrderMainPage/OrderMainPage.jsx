import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import useChatStore from 'stores/customer/useChatStore';
import { validateReservationUrl, getOrderData } from 'api/customer/socket';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useOrderStore from 'stores/customer/useOrderStore';
import useCartStore from 'stores/customer/useCartStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import {
  TopBox,
  OrderContainer,
  ButtonWrapper,
} from '../../../../pages/customer/order/OrderMainPage/OrderMainPage.js';
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
  PeopleP,
  TotalMenuP,
  TotalPriceDiv,
  TotalPriceP,
} from './OrderMainPage.js';

const OrderMainPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reservationParticipantId, setreservationParticipantId] = useState(0);

  const [orders, setOrders] = useState([]);

  const [myOrders, setMyOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const [myTotalCnt, setMyTotalCnt] = useState(0);
  const [allTotalCnt, setAllTotalCnt] = useState(0);

  const [myTotalPrice, setMyTotalPrice] = useState(0);
  const [allTotalPrice, setAllTotalPrice] = useState(0);

  const tabs = ['나의 메뉴', '전체 메뉴'];
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
    isConnected,
    setIsConnected,
    stompClient,
    setStompClient,
    chatPage,
    chatSize,
  } = useChatStore();

  const { allOrdersInfo, setAllOrdersInfo } = useOrderStore();

  const {
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
    const gotoChat = () => {
      nav(`/customer/order/chat/${reservationUrl}`);
    };
    const gotoSelectMenu = () => {
      nav(`/customer/order/menu-select/${reservationUrl}`);
    };
    setActiveIcons([8, 10]);
    setIconAction([gotoSelectMenu, gotoChat]);
  }, []);

  // 모든 주문 데이터 불러오기
  useEffect(() => {
    const validateAndConnect = async () => {
      console.log('render main page');
      const response = await validateReservationUrl(reservationUrl);

      // stompClient가 없는 경우에만 소켓 연결 시도
      if (!stompClient) {
        console.log('stompClient가 없어 소켓 연결을 시도합니다.');
        initializeConnection();
        return;
      }

      // reservationUrl 유효성 검사 실행 후 유효한 경우
      if (response.status !== 200) {
        alert('유효한 예약 URL이 아닙니다.');
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
    };

    const initializeConnection = () => {
      const socket = new SockJS(
        `${process.env.REACT_APP_REST_API_URL}/api/public/ws`
      );
      const client = Stomp.over(socket);

      client.connect(
        {},
        () => {
          // 구독
          client.subscribe(
            `/topic/reservations/${reservationUrl}`,
            (response) => {
              const content = JSON.parse(response.body);
              console.log('main sumin Received message: ', content);

              if (content.socketType === 'CART') {
                console.log('cart socket message ');
                console.dir(content.cartElements);
                setCartElements(content.cartElements);
              } else if (content.socketType === 'ORDER') {
                setCartElements([]);
              }
            },
            (error) => {
              console.log(error);
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

    const fetchOrdersInfo = async () => {
      const allOrdersInfo = await getOrderData(
        reservationUrl,
        chatPage,
        chatSize
      );

      console.log('메인페이지 불러온 데이터:', allOrdersInfo.data);

      setReservationDate(allOrdersInfo.data.reservationDate);
      setReservationStartTime(allOrdersInfo.data.reservationDate);
      setReservationEndTime(allOrdersInfo.data.reservationEndTime);
      setRestaurantId(allOrdersInfo.data.restaurantId);
      setReservationId(allOrdersInfo.data.reservationId);

      // 전체 주문 리스트 저장
      setAllOrdersInfo(allOrdersInfo.data);
      setCartElements(
        allOrdersInfo.data.cartDetailResponseDto
          ? allOrdersInfo.data.cartDetailResponseDto.cartElements
          : []
      );
      setOrders(
        allOrdersInfo?.orderListResponseDto?.orderDetailResponseDtos || []
      );

      setMyOrders(
        orders.filter(
          (order) => order.reservationParticipantId === reservationParticipantId
        )
      );
      setAllOrders(groupByNicknameWithTotalPrice(orders));

      setMyTotalCnt(calculateTotalCnt(myOrders));
      setAllTotalCnt(calculateTotalCnt(orders));

      setMyTotalPrice(
        myOrders.reduce(
          (acc, order) => acc + order.totalCnt * order.menuPrice,
          0
        )
      );
      setAllTotalPrice(calculateTotalPriceForAll(allOrders));
    };

    validateAndConnect();

    if (isConnected) {
      fetchOrdersInfo();
    }
  }, []);

  useEffect(() => {
    // 각 변수들 세팅
    setOrders(
      allOrdersInfo?.orderListResponseDto?.orderDetailResponseDtos || []
    );

    setMyOrders(
      orders.filter(
        (order) => order.reservationParticipantId === reservationParticipantId
      )
    );
    setAllOrders(groupByNicknameWithTotalPrice(orders));

    setMyTotalCnt(calculateTotalCnt(myOrders));
    setAllTotalCnt(calculateTotalCnt(orders));

    setMyTotalPrice(
      myOrders.reduce((acc, order) => acc + order.totalCnt * order.menuPrice, 0)
    );
    setAllTotalPrice(calculateTotalPriceForAll(allOrders));
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
                총 메뉴 {activeTab === 0 ? myTotalCnt : allTotalCnt}개
              </TotalMenuP>
            </MenuContainer>
          </TopBox>
          <MenuDiv>
            {activeTab === 0 ? (
              // 나의 메뉴
              <div>
                {myOrders.length > 0 && (
                  <div>
                    {myOrders.map((order, index) => (
                      <div key={index}>
                        <FoodDiv>
                          {order.menuImage && (
                            <MenuImg src={order.menuImage} alt="메뉴사진" />
                          )}
                          <FoodInfoDiv>
                            <FoodInfoTopDiv>
                              <MenuNameP>{order.menuName}</MenuNameP>
                            </FoodInfoTopDiv>
                            <FoodInfoBottomDiv>
                              <FoodInfoCountDiv>
                                <PeopleP>총 주문:</PeopleP>
                                <FoodInfoCountP>
                                  {order.totalCnt}
                                </FoodInfoCountP>
                                <PeopleP>미결제 수량:</PeopleP>
                                <FoodInfoCountP>
                                  {order.totalCnt - order.paidCnt}
                                </FoodInfoCountP>
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
            ) : (
              // 전체 메뉴
              <div>
                {Object.entries(allOrders).map(([nickname, group]) => (
                  <div key={nickname}>
                    <PeopleP>{nickname}</PeopleP>
                    <LineDiv />
                    {Array.isArray(group.orders) && group.orders.length > 0 ? (
                      group.orders.map((order, index) => (
                        <div key={index}>
                          <FoodDiv>
                            {order.menuImage && (
                              <MenuImg
                                src={order.menuImage}
                                alt={order.menuName}
                              />
                            )}
                            <FoodInfoDiv>
                              <FoodInfoTopDiv>
                                <MenuNameP>{order.menuName}</MenuNameP>
                              </FoodInfoTopDiv>
                              <FoodInfoBottomDiv>
                                <FoodInfoCountDiv>
                                  <PeopleP>총 주문:</PeopleP>
                                  <FoodInfoCountP>
                                    {order.totalCnt}
                                  </FoodInfoCountP>
                                  <PeopleP>미결제 수량:</PeopleP>
                                  <FoodInfoCountP>
                                    {order.totalCnt - order.paidCnt}
                                  </FoodInfoCountP>
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
                        총: {group.totalPrice.toLocaleString('ko-KR')} 원
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
            )}
          </MenuDiv>
        </div>

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
      </OrderContainer>
    </>
  );
};

export default OrderMainPage;
