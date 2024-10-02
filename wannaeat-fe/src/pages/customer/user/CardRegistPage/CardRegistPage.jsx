import { useEffect } from 'react';
import {
  getCreditCardIssuerList,
  createCreditCardProduct,
  getCreditCardList,
  isCreditCardExist,
} from 'api/common/ssafyPay/card.js';
import useCardStore from 'stores/customer/useCardStore';
const CardRegistPage = () => {
  const { cardList, setCardIssuerList, setCardList } = useCardStore();
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
  }, []);
  return (
    <div>
      {cardList.map((card, index) => {
        return (
          <div key={index}>
            {card.cardNo} - {card.cardIssuerName}
          </div>
        );
      })}
    </div>
  );
};

export default CardRegistPage;
