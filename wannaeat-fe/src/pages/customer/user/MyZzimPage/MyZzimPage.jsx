import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import {
  MyZzimPageContainer,
  MyZzimItem,
  MyZzimItemImage,
  MyZzimInfoWrapper,
  MyZzimInfoTitle,
  MyZzimInfoText,
  MyZzimHeartButton,
} from './MyZzimPage';
import { getMyZzimRestaurants, removeZzimRestaurant } from 'api/customer/zzim';
const MyZzimPage = () => {
  const { setPageName, setIsShowBackIcon, setActiveIcons } = useHeaderStore();
  const [zzimList, setZzimList] = useState([]);
  useEffect(() => {
    const fetchMyZzim = async () => {
      const result = await getMyZzimRestaurants();
      console.log(result);
      if (result.status === 200) {
        console.log('찜 목록 불러오기 성공');
        setZzimList(result.data.data.userLikeDetailResponseDtos);
      } else {
        console.log('찜 목록 불러오기 실패');
      }
    };
    setPageName('내가 찜한 식당');
    setIsShowBackIcon(true);
    setActiveIcons([]);
    fetchMyZzim();
  }, []);
  return (
    <MyZzimPageContainer>
      {zzimList.length > 0 ? (
        zzimList.map((card, index) => (
          <MyZzimItem key={index}>
            {/* <MyZzimItemImage src={cardMaps[card.cardName]} /> */}
            <MyZzimInfoWrapper>
              <MyZzimInfoTitle>{card.cardName}</MyZzimInfoTitle>
              <MyZzimInfoText>{card.cardDescription}</MyZzimInfoText>
            </MyZzimInfoWrapper>
            {/* <MyZzimHeartButton onClick={() => addCard(card.cardUniqueNo)}>
              <img src={AddIcon} />
            </MyZzimHeartButton> */}
          </MyZzimItem>
        ))
      ) : (
        <p>내가 찜한 매장이 없습니다.</p>
      )}
    </MyZzimPageContainer>
  );
};
export default MyZzimPage;
