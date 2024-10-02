import { useEffect } from 'react';
import {
  getCreditCardIssuerList,
  createCreditCardProduct,
  getCreditCardList,
} from 'api/common/ssafyPay/card.js';
import useCardStore from 'stores/customer/useCardStore';
const CardRegistPage = () => {
  const { setCardIssuerList } = useCardStore();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCreditCardIssuerList();
      console.log(result);
      setCardIssuerList(result.data.Header.REC);
      console.log(localStorage.getItem('restaurantMerchantCategoryId'));
      const result2 = await createCreditCardProduct(
        '1001',
        'KB국민 청춘대로 카드',
        300000,
        20000,
        '젊은 층을 위한 다양한 생활 혜택 제공',
        [
          {
            categoryId: localStorage.getItem('restaurantMerchantCategoryId'),
            discountRate: '1',
          },
        ],
        localStorage.getItem('restaurantMerchantCategoryId'),
        10.0
      );
      console.log(result2);
    };

    fetchData();
  }, []);
  return <div></div>;
};

export default CardRegistPage;
