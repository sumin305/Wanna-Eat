import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import useTextfieldStore from 'stores/common/useTextfieldStore.js';
import {
  RestaurantRegistPageStyled,
  ContentWrapperStyled,
  DropdownWrapperStyled,
  InputWithLabelStyled,
  InputWrapperStyled,
  UploadButton,
} from './ManagerRegistPage.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore.js';
import WETextField from 'component/common/textfield/WETextfield/WETextfield.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import MapModal from 'component/manager/map/MapModal.jsx';
import { registRestaurant } from 'api/manager/restaurant/restaurant.js';
import WEDropdown from 'component/common/dropdown/WEDropdown.jsx';
import useMapFilterStore from 'stores/map/useMapFilterStore.js';
import {
  useDropdownStore,
  useVisitTimeDropdownStore,
  useEndTimeDropdownStore,
} from 'stores/common/useDropdownStore.js';
import useAlert from 'utils/alert.js';
import useReservationStore from 'stores/customer/useReservationStore.js';
import PlusImg from 'assets/icons/menu/Plus.svg';
import { useNavigate } from 'react-router-dom';

const ManagerRegistPage = () => {
  const { setIsCarrot, setPageName, setIsUnderLine } = useHeaderStore();
  const { managerFormData, setManagerFormData } = useMyRestaurantStore();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const { setItems } = useDropdownStore();
  const { setError, clearError } = useTextfieldStore();
  const { lunchTimes, dinnerTimes } = useReservationStore();

  const { setItems: setVisitTimeItems } = useVisitTimeDropdownStore();
  const { setItems: setEndTimeItems } = useEndTimeDropdownStore();

  const [previewUrl, setPreviewUrl] = useState(null); // 이미지 미리보기용 URL

  const showAlert = useAlert();
  const allTimes = [...lunchTimes, ...dinnerTimes];

  const nav = useNavigate();

  const handleAddressClick = () => {
    setIsMapModalOpen(true);
  };

  const handleMapConfirm = (latitude, longitude, address) => {
    setManagerFormData('lat', latitude);
    setManagerFormData('lng', longitude);
    setManagerFormData('address', address);
  };

  const handleRegistButtonClick = async () => {
    const response = await registRestaurant({
      restaurantOwnerName: managerFormData.name,
      restaurantBusinessNumber: managerFormData.number,
      restaurantAddress: managerFormData.address,
      restaurantPhone: managerFormData.phone,
      restaurantName: managerFormData.restaurantName,
      restaurantCategoryId: managerFormData.businessType,
      latitude: managerFormData.lat,
      longitude: managerFormData.lng,
      restaurantOpenTime: managerFormData.restaurantOpenTime,
      restaurantCloseTime: managerFormData.restaurantCloseTime,
      depositPerMember: managerFormData.depositPerMember,
    });
    if (response.status === 201) {
      const restaurantId = response.data.data;
      window.localStorage.setItem('restaurantId', restaurantId);
      showAlert(response.data.message, () => nav('/manager'));
    } else if (response.status === 400) {
      showAlert('값을 형식에 맞게 입력하세요.');
    } else {
      showAlert(response.response.data.message);
    }
  };

  useEffect(() => {
    setIsCarrot(false);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
    setItems(
      JSON.parse(localStorage.getItem('categories')).map(
        (category) => category.restaurantCategoryName
      )
    );
    setVisitTimeItems(allTimes);
    setEndTimeItems(allTimes);
  }, []);

  return (
    <RestaurantRegistPageStyled>
      <ContentWrapperStyled>
        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>대표자</label>
            <WETextField
              name="restaurantRegist-name"
              placeholder="대표자 이름을 입력하세요."
              value={managerFormData.name}
              showErrorMessageSpace={true}
              onChange={(e) => setManagerFormData('name', e.target.value)}
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>사업장 주소</label>
            <WETextField
              name="restaurantRegist-address"
              placeholder="사업장 주소를 입력하세요."
              value={managerFormData.address}
              showErrorMessageSpace={true}
              onChange={(e) => setManagerFormData('address', e.target.value)}
              onClick={handleAddressClick}
              onFocus={handleAddressClick}
            />
            <MapModal
              isOpen={isMapModalOpen}
              onClose={() => setIsMapModalOpen(false)}
              onConfirm={handleMapConfirm}
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>사업자등록번호</label>
            <WETextField
              name="restaurantRegist-Number"
              placeholder="xxx-xx-xxxxx"
              value={managerFormData.number}
              showErrorMessageSpace={true}
              onChange={(e) => setManagerFormData('number', e.target.value)}
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>전화번호</label>
            <WETextField
              name="restaurantRegist-phone"
              placeholder="00000000000"
              value={managerFormData.phone}
              showErrorMessageSpace={true}
              onChange={(e) => setManagerFormData('phone', e.target.value)}
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>매장명</label>
            <WETextField
              name="restaurantRegist-restaurantName"
              placeholder="매장명을 입력하세요."
              value={managerFormData.restaurantName}
              showErrorMessageSpace={true}
              onChange={(e) =>
                setManagerFormData('restaurantName', e.target.value)
              }
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>업종</label>
            <WEDropdown
              useDropdownStore={useDropdownStore}
              placeholder="카테고리를 선택하세요"
              onSelect={(e) => {
                const categories = JSON.parse(
                  localStorage.getItem('categories')
                );
                const categoryId = categories.find(
                  (category) => category.restaurantCategoryName === e
                ).restaurantCategoryId;
                setManagerFormData('businessType', categoryId);
              }}
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <label>영업시간</label>
          <DropdownWrapperStyled>
            <WEDropdown
              useDropdownStore={useVisitTimeDropdownStore}
              placeholder="시작시간"
              onSelect={(value) => {
                setManagerFormData('restaurantOpenTime', value);
              }}
            />
            <WEDropdown
              useDropdownStore={useEndTimeDropdownStore}
              placeholder="끝나는시간"
              onSelect={(value) => {
                setManagerFormData('restaurantCloseTime', value);
              }}
            />
          </DropdownWrapperStyled>
        </InputWrapperStyled>

        <InputWrapperStyled>
          <InputWithLabelStyled>
            <label>인당 보증금(원)</label>
            <WETextField
              name="restaurantRegist-restaurantName"
              placeholder="숫자로 입력하세요."
              value={managerFormData.depositPerMember}
              showErrorMessageSpace={true}
              onChange={(e) =>
                setManagerFormData('depositPerMember', e.target.value)
              }
            />
          </InputWithLabelStyled>
        </InputWrapperStyled>
      </ContentWrapperStyled>

      <WEButton
        className="testButton"
        onClick={handleRegistButtonClick}
        size="long"
      >
        확인
      </WEButton>
    </RestaurantRegistPageStyled>
  );
};

export default ManagerRegistPage;
