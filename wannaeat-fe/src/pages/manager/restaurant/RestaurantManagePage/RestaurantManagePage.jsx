import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import useTextfieldStore from 'stores/common/useTextfieldStore.js';
import validateName from 'utils/manager/restaurantRegistValidation.js';
import {
  RestaurantRegistPageStyled,
  TabWithButtonStyled,
  TabWrapperStyled,
  ContentWrapperStyled,
  DropdownWrapperStyled,
  InputWithLabelStyled,
  InputWrapperStyled,
  UploadButton,
} from './RestaurantManagePage.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore.js';
import WETextField from 'component/common/textfield/WETextfield/WETextfield.jsx';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import MapModal from 'component/manager/map/MapModal.jsx';
import {
  registRestaurant,
  updateRestaurant,
  getRestaurantData,
} from 'api/manager/restaurant/restaurant.js';
import WEDropdown from 'component/common/dropdown/WEDropdown.jsx';
import useMapFilterStore from 'stores/map/useMapFilterStore.js';
import {
  useDropdownStore,
  useVisitTimeDropdownStore,
  useEndTimeDropdownStore,
  useBreakStartTimeDropdownStore,
  useBreakEndTimeDropdownStore,
  useDurationDropdownStore,
} from 'stores/common/useDropdownStore.js';
import useAlert from 'utils/alert.js';
import useReservationStore from 'stores/customer/useReservationStore.js';
import { useNavigate } from 'react-router-dom';
import PlusImg from 'assets/icons/menu/Plus.svg';

const RestaurantManagePage = () => {
  const nav = useNavigate();
  const tabs = ['사업자', '매장'];
  const { setIsCarrot, setPageName, setIsUnderLine } = useHeaderStore();
  const { managerFormData, setManagerFormData } = useMyRestaurantStore();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const { setCategoryId } = useMapFilterStore();
  const { setItems } = useDropdownStore();
  const { setError, clearError } = useTextfieldStore();
  const { lunchTimes, dinnerTimes } = useReservationStore();

  const { setItems: setVisitTimeItems } = useVisitTimeDropdownStore();
  const { setItems: setDurationTimeItems } = useDurationDropdownStore();
  const { setItems: setEndTimeItems } = useEndTimeDropdownStore();
  const { setItems: setBreakStartTimeItems } = useBreakStartTimeDropdownStore();
  const { setItems: setBreakEndTimeItems } = useBreakEndTimeDropdownStore();

  const [previewUrl, setPreviewUrl] = useState(null); // 이미지 미리보기용 URL

  const showAlert = useAlert();
  const restaurantId = window.localStorage.getItem('restaurantId') || '';
  const allTimes = [...lunchTimes, ...dinnerTimes];

  const [restaurantFormData, setRestaurantFormData] = useState({
    breakStartTime: '',
    breakEndTime: '',
    maxReservationTime: '',
    minMemberCount: '',
    maxMemberCount: '',
    restaurantDescription: '',
    restaurantImages: [],
  });

  const handleAddressClick = () => {
    setIsMapModalOpen(true);
  };

  const handleMapConfirm = (latitude, longitude, address) => {
    setManagerFormData('lat', latitude);
    setManagerFormData('lng', longitude);
    setManagerFormData('address', address);
  };

  const handleCategoryOnSelect = (e) => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const categoryId = categories.find(
      (category) => category.restaurantCategoryName === e
    ).restaurantCategoryId;
    setManagerFormData('businessType', categoryId);
  };

  const handleMenuButtonClick = () => {
    nav(`/manager/menu`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setRestaurantFormData((prevData) => ({
      ...prevData,
      restaurantImages: file,
    }));
    setPreviewUrl(URL.createObjectURL(file)); // 이미지 미리보기 URL 설정
  };

  const handleRegistButtonClick = async () => {
    if (activeTab === 0) {
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
        setActiveTab(1);
        showAlert(response.data.message);
      } else {
        showAlert('값을 형식에 맞게 입력하세요.');
      }
    } else if (activeTab === 1) {
      const formData = new FormData();

      const restaurantEditRequestDto = {
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
        restaurantDescription: restaurantFormData.restaurantDescription || '',
        breakStartTime: restaurantFormData.breakStartTime || '',
        breakEndTime: restaurantFormData.breakEndTime || '',
        maxReservationTime: restaurantFormData.maxReservationTime || '',
        minMemberCount: restaurantFormData.minMemberCount || '',
        maxMemberCount: restaurantFormData.maxMemberCount || '',
      };

      formData.append(
        'restaurantEditRequestDto',
        new Blob([JSON.stringify(restaurantEditRequestDto)], {
          type: 'application/json',
        })
      );

      if (restaurantFormData.restaurantImages) {
        formData.append(
          'restaurantImages',
          restaurantFormData.restaurantImages
        );
      }

      try {
        const response = await updateRestaurant(restaurantId, formData);
        console.log('가게정보 수정 정보', response);
      } catch (error) {
        console.log('가게 정보 수정 중 오류', error);
      }
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const response = await getRestaurantData(restaurantId);
      console.log('가게정보조회결과', response);

      if (response.status === 200) {
        const restaurantData = response.data.data;

        // 조회한 가게 정보를 상태에 세팅
        setManagerFormData('name', restaurantData.restaurantOwnerName || '');
        setManagerFormData(
          'number',
          restaurantData.restaurantBusinessNumber || ''
        );
        setManagerFormData('address', restaurantData.restaurantAddress || '');
        setManagerFormData('phone', restaurantData.restaurantPhone || '');
        setManagerFormData(
          'restaurantName',
          restaurantData.restaurantName || ''
        );
        setManagerFormData(
          'businessType',
          restaurantData.restaurantCategoryName || ''
        );
        setManagerFormData('lat', restaurantData.latitude || '');
        setManagerFormData('lng', restaurantData.longitude || '');
        setManagerFormData(
          'restaurantOpenTime',
          restaurantData.restaurantOpenTime || ''
        );
        setManagerFormData(
          'restaurantCloseTime',
          restaurantData.restaurantCloseTime || ''
        );
        console.log('영업 시작시간:', restaurantData.restaurantOpenTime);
        console.log('영업 끝나는시간:', restaurantData.restaurantCloseTime);
        setManagerFormData(
          'depositPerMember',
          restaurantData.depositPerMember || ''
        );

        // restaurantFormData에도 필요한 값을 세팅
        setRestaurantFormData((prevData) => ({
          ...prevData,
          breakStartTime: restaurantData.breakStartTime || '',
          breakEndTime: restaurantData.breakEndTime || '',
          maxReservationTime: restaurantData.maxReservationTime || '',
          minMemberCount: restaurantData.minMemberCount || '',
          maxMemberCount: restaurantData.maxMemberCount || '',
          restaurantDescription: restaurantData.restaurantDescription || '',
        }));
      }
    } catch (error) {
      console.log('가게 정보 조회 중 오류', error);
    }
  };

  useEffect(() => {
    setIsCarrot(false);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    if (activeTab === 0) {
      setItems(
        JSON.parse(localStorage.getItem('categories')).map(
          (category) => category.restaurantCategoryName
        )
      );
      setVisitTimeItems(allTimes);
      setEndTimeItems(allTimes);
    } else if (activeTab === 1) {
      setBreakStartTimeItems(allTimes);
      setBreakEndTimeItems(allTimes);
      setDurationTimeItems([30, 60, 90, 120]);
    }
  }, [activeTab]);

  const renderContent = (activeTab) => {
    switch (activeTab) {
      case 0:
        return (
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
                  onChange={(e) =>
                    setManagerFormData('address', e.target.value)
                  }
                  onClick={handleAddressClick}
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
                  onSelect={handleCategoryOnSelect}
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
        );
      case 1:
        return (
          <ContentWrapperStyled>
            <InputWrapperStyled>
              <label>브레이크 타임</label>
              <DropdownWrapperStyled>
                <WEDropdown
                  useDropdownStore={useBreakStartTimeDropdownStore}
                  placeholder="시작시간"
                  value={restaurantFormData.breakStartTime}
                  onSelect={(value) =>
                    setRestaurantFormData((prevData) => ({
                      ...prevData,
                      breakStartTime: value,
                    }))
                  }
                />

                <WEDropdown
                  useDropdownStore={useBreakEndTimeDropdownStore}
                  placeholder="끝나는시간"
                  value={restaurantFormData.breakEndTime}
                  onSelect={(value) =>
                    setRestaurantFormData((prevData) => ({
                      ...prevData,
                      breakEndTime: value,
                    }))
                  }
                />
              </DropdownWrapperStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <label>최대 이용 가능 시간(분)</label>
              <DropdownWrapperStyled>
                <WEDropdown
                  useDropdownStore={useDurationDropdownStore}
                  placeholder="시간을 선택하세요."
                  value={restaurantFormData.maxReservationTime}
                  onSelect={(value) =>
                    setRestaurantFormData((prevData) => ({
                      ...prevData,
                      maxReservationTime: value,
                    }))
                  }
                />
              </DropdownWrapperStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>최소 이용 가능 인원(명)</label>
                <input
                  type="number"
                  name="minPeople"
                  id="minPeople"
                  value={restaurantFormData.minMemberCount}
                  onChange={(e) =>
                    setRestaurantFormData((prevData) => ({
                      ...prevData,
                      minMemberCount: e.target.value,
                    }))
                  }
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>최대 이용 가능 인원(명)</label>
                <input
                  type="number"
                  name="maxPeople"
                  id="maxPeople"
                  value={restaurantFormData.maxMemberCount}
                  onChange={(e) =>
                    setRestaurantFormData((prevData) => ({
                      ...prevData,
                      maxMemberCount: e.target.value,
                    }))
                  }
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>식당 소개</label>
                <WETextField
                  name="restaurantRegist-description"
                  placeholder="업종을 입력하세요."
                  value={restaurantFormData.restaurantDescription}
                  showErrorMessageSpace={true}
                  onChange={(e) =>
                    setRestaurantFormData((prevData) => ({
                      ...prevData,
                      restaurantDescription: e.target.value,
                    }))
                  }
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>매장 사진</label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="미리보기"
                    width="200"
                    style={{
                      display: 'block',
                      margin: '10px 0',
                      borderRadius: '8px',
                    }}
                  />
                )}
                <UploadButton as="label">
                  <img
                    src={PlusImg}
                    alt="사진 추가"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </UploadButton>
              </InputWithLabelStyled>
            </InputWrapperStyled>
          </ContentWrapperStyled>
        );
      default:
        return null;
    }
  };

  return (
    <RestaurantRegistPageStyled>
      <TabWithButtonStyled>
        <TabWrapperStyled>
          <WETab
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </TabWrapperStyled>
        <WEButton
          className="testButton"
          size="menu"
          onClick={handleMenuButtonClick}
        >
          메뉴
        </WEButton>
      </TabWithButtonStyled>

      <ContentWrapperStyled>{renderContent(activeTab)}</ContentWrapperStyled>

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

export default RestaurantManagePage;
