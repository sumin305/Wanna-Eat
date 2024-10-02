import { useEffect } from 'react';
import {
  getCreditCardIssuerList,
  getCreditCardList,
  createCreditCard,
} from 'api/common/ssafyPay/card.js';
import useCardStore from 'stores/customer/useCardStore';
import useHeaderStore from 'stores/common/useHeaderStore';
import styled from '@emotion/styled';
import theme from 'style/common/theme';
import { cardMaps } from 'assets';
import AddIcon from 'assets/customer/add.svg';
import useAlert from 'utils/alert';
import {
  CardRegistPageContainer,
  CardRegistItem,
  CardRegistItemImage,
  CardInfoWrapper,
  CardInfoTitle,
  CardInfoText,
  CardRegistButton,
} from './CardRegistPage';
import { useNavigate } from 'react-router-dom';

const CardRegistPage = () => {
  const { cardList, setCardIssuerList, setCardList } = useCardStore();
  const { setPageName, setIsShowBackIcon, setActiveIcons } = useHeaderStore();
  const alert = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const cardIssuerRest = await getCreditCardIssuerList();
      setCardIssuerList(cardIssuerRest.data.Header.REC);

      const cardListResult = await getCreditCardList();
      const cards = cardListResult.data.REC;

      const cardNames = cardListResult.data.REC.map((card) => card.cardName);
      const uniqueCards = [];

      for (let i = 0; i < cards.length; i++) {
        // 해당 이름이 나타나는 가장 첫 이름이라면
        if (cardNames.indexOf(cardNames[i]) === i) {
          console.log('cards[i]', cards[i]);
          uniqueCards.push(cards[i]);
        }
      }
      setCardList(uniqueCards);
    };

    fetchData();

    setPageName('카드 추가');
    setIsShowBackIcon(true);
    setActiveIcons([]);
  }, []);

  const getPriceInfo = (price) => {
    if (price.length > 4) {
      return price.slice(0, -4).toLocaleString() + '만원';
    } else {
      return price.toLocaleString() + '원';
    }
  };

  const addCard = async (cardUniqueNo) => {
    const result = await createCreditCard(cardUniqueNo);
    if (result.status === 200) {
      alert('카드 추가에 성공했습니다.');
      navigate('/customer/card-manage');
    }
  };
  return (
    <CardRegistPageContainer>
      {cardList.length > 0 ? (
        cardList.map((card, index) => (
          <CardRegistItem key={index}>
            <CardRegistItemImage src={cardMaps[card.cardName]} />
            <CardInfoWrapper>
              <CardInfoTitle>{card.cardName}</CardInfoTitle>
              <CardInfoText>{card.cardDescription}</CardInfoText>
              <CardInfoText>
                기준실적 {getPriceInfo(card.baselinePerformance)}
              </CardInfoText>
              <CardInfoText>
                최대 혜택한도 {getPriceInfo(card.maxBenefitLimit)}
              </CardInfoText>
            </CardInfoWrapper>
            <CardRegistButton onClick={() => addCard(card.cardUniqueNo)}>
              <img src={AddIcon} />
            </CardRegistButton>
          </CardRegistItem>
        ))
      ) : (
        <p>카드 정보를 불러오는 중입니다...</p>
      )}
    </CardRegistPageContainer>
  );
};

export default CardRegistPage;
