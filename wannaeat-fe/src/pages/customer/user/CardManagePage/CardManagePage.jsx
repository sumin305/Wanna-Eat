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
  CardNameText,
} from './CardManagePage.js';
import Button from '../../../../component/common/button/WEButton/WEButton';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import { cardMaps } from 'assets';

const CardManagePage = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [goToSlide, setGoToSlide] = useState(null);
  const navigate = useNavigate();
  const { setPageName, setIsShowLogo, setIsShowBackIcon, setActiveIcons } =
    useHeaderStore();

  const handleCardRegistButtonClick = () => {
    navigate('/customer/card-regist');
  };

  const handleCardClick = (index, card) => {
    setGoToSlide(index);
    setSelectedCard(card);
  };

  const slides = cards.map((card, index) => ({
    key: index,
    content: (
      <div>
        <img
          onClick={() => handleCardClick(index, card)}
          width="144px"
          height="229px"
          src={cardMaps[card.cardName]}
          alt={`Card ${card.cardNo}`}
        />
        <CardNameText>{card.cardName}</CardNameText>
      </div>
    ),
  }));

  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      const cards = result.data.REC;
      setCards([...cards, { cardName: '카카오페이카드', cardNo: '0' }]);
    };
    fetchCards();
    setPageName('카드 관리');
    setIsShowBackIcon(true);
    setActiveIcons([]);
  }, []);

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
