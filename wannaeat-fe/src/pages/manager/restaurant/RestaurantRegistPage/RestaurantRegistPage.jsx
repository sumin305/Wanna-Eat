import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import useTextfieldStore from 'stores/common/useTextfieldStore.js';
// import useDropdownStore from 'stores/common/useDropdownStore.js';
import validateName from 'utils/manager/restaurantRegistValidation.js';
import {
  RestaurantRegistPageStyled,
  TabWithButtonStyled,
  TabWrapperStyled,
  ContentWrapperStyled,
  InputWithLabelStyled,
  InputWrapperStyled,
} from './RestaurantRegistPage.js';
import WETextField from 'component/common/textfield/WETextfield/WETextfield.jsx';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
// import WETimeDropdown from 'component/manager/WETimeDropdown.jsx';
import MapModal from 'component/manager/map/MapModal.jsx';

const RestaurantRegistPage = () => {
  const tabs = ['사업자', '매장'];
  const { setIsCarrot, setPageName, setIsUnderLine } = useHeaderStore();
  const { setError, clearError } = useTextfieldStore();

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleAddressClick = () => {
    setIsMapModalOpen(true);
  };

  const handleMapConfirm = (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);
    setAddress(`위도: ${latitude}, 경도: ${longitude}`);
  };
  console.log('위도, 경도', lat, lng);
  const [name, setName] = useState('');
  // const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsCarrot(false);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
  }, [setIsCarrot, setIsUnderLine, setPageName]);

  const handleValidateNickname = () => {
    const result = validateName(name);
    if (!result.isValid) {
      setError('name', result.type, result.message);
    } else {
      clearError('name');
    }
  };

  const handleRegistButtonClick = () => {};
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
                  value={name}
                  showErrorMessageSpace={true}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleValidateNickname}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>사업장 주소</label>
                <WETextField
                  name="restaurantRegist-address"
                  placeholder="사업장 주소를 입력하세요."
                  value={address}
                  showErrorMessageSpace={true}
                  // onChange={(e) => setAddress(e.target.value)}
                  onClick={handleAddressClick}
                  readOnly={true}
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
                <label>전화번호</label>
                <WETextField
                  name="restaurantRegist-phone"
                  placeholder="전화번호를 입력하세요."
                  value={phone}
                  showErrorMessageSpace={true}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>매장명</label>
                <WETextField
                  name="restaurantRegist-restaurantName"
                  placeholder="매장명을 입력하세요."
                  value={restaurantName}
                  showErrorMessageSpace={true}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>업종</label>
                <WETextField
                  name="restaurantRegist-businessType"
                  placeholder="업종을 입력하세요."
                  value={businessType}
                  showErrorMessageSpace={true}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>
          </ContentWrapperStyled>
        );
      case 1:
        return (
          <ContentWrapperStyled>
            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>대표자</label>
                {/* <WETimeDropdown /> */}
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>사업장 주소</label>
                <WETextField
                  name="restaurantRegist-address"
                  placeholder="사업장 주소를 입력하세요."
                  value={address}
                  showErrorMessageSpace={true}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>전화번호</label>
                <WETextField
                  name="restaurantRegist-phone"
                  placeholder="전화번호를 입력하세요."
                  value={phone}
                  showErrorMessageSpace={true}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>매장명</label>
                <WETextField
                  name="restaurantRegist-restaurantName"
                  placeholder="매장명을 입력하세요."
                  value={restaurantName}
                  showErrorMessageSpace={true}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </InputWithLabelStyled>
            </InputWrapperStyled>

            <InputWrapperStyled>
              <InputWithLabelStyled>
                <label>업종</label>
                <WETextField
                  name="restaurantRegist-businessType"
                  placeholder="업종을 입력하세요."
                  value={businessType}
                  showErrorMessageSpace={true}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
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
        <WEButton className="testButton" size={'menu'}>
          메뉴
        </WEButton>
      </TabWithButtonStyled>

      <ContentWrapperStyled>{renderContent(activeTab)}</ContentWrapperStyled>

      <WEButton
        className="testButton"
        onClick={handleRegistButtonClick}
        size={'long'}
      >
        확인
      </WEButton>
    </RestaurantRegistPageStyled>
  );
};

export default RestaurantRegistPage;
