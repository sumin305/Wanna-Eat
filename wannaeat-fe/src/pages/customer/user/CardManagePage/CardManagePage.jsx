import CardImage1 from 'assets/customer/카카오페이카드.png';
import CardImage2 from 'assets/customer/농협카드.png';
import CardImage3 from 'assets/customer/신한카드.png';
import CardImage4 from 'assets/customer/우리카드.png';
import CardImage5 from 'assets/customer/국민카드.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCreditCardList } from 'api/common/ssafyPay/card.js';
import Carousel from 'react-spring-3d-carousel';
import {
  CardManagePageContainer,
  CardSelectBoxStyled,
  ButtonWrapper,
} from './CardManagePage.js';
import Button from '../../../../component/common/button/WEButton/WEButton';
import useHeaderStore from 'stores/common/useHeaderStore.js';
const CardManagePage = () => {
  const cardImages = {
    카카오페이카드: CardImage1,
    농협카드: CardImage2,
    신협카드: CardImage3,
    우리카드: CardImage4,
    KB국민카드: CardImage5,
  };
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [goToSlide, setGoToSlide] = useState(null);
  const navigate = useNavigate();
  const { setPageName, setIsShowLogo, setIsShowBackIcon, setActiveIcons } =
    useHeaderStore();
  const slides = cards.map((card, index) => ({
    key: index,
    content: (
      <div>
        <img
          onClick={() => {
            setGoToSlide(index);
            setSelectedCard(card);
          }}
          width="144px"
          height="229px"
          src={cardImages[card.cardIssuerName]}
          alt={`Card ${card.cardNo}`}
        />
        {/* <p>${card.}</p> */}
      </div>
    ),
  }));

  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      const cards = result.data.REC;
      setCards([...cards, { cardIssuerName: '카카오페이카드', cardNo: '0' }]);
    };
    fetchCards();
    setPageName('카드 관리');
    setIsShowBackIcon(true);
    setActiveIcons([]);
  }, []);

  const handleCardRegistButtonClick = () => {
    navigate('/customer/card-regist');
  };
  return (
    <CardManagePageContainer>
      <ButtonWrapper>
        <Button
          size="long"
          outlined={'true'}
          onClick={handleCardRegistButtonClick}
        >
          카드 추가하기
        </Button>
      </ButtonWrapper>
      <CardSelectBoxStyled>
        <Carousel slides={slides} goToSlide={goToSlide} />
      </CardSelectBoxStyled>
    </CardManagePageContainer>
  );
};
export default CardManagePage;
