import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/header/useHeaderStore.js';
import useTextfieldStore from 'stores/common/textfield/useTextfieldStore.js';
import validateNickname from 'utils/manager/restaurantRegistValidation.js';
import {
  RestaurantRegistPageStyled,
  TabWrapperStyled,
  TextfieldsStyled,
  TextfieldWrapperStyled,
} from './RestaurantRegistPage.js';
import WETextField from 'component/common/textfield/WETextfield/WETextfield.jsx';
import WETab from 'component/common/tab/WETab/WETab.jsx';

const RestaurantRegistPage = () => {
  const tabs = ['사업자', '매장'];
  const { setIsCarrot, setPageName, setIsUnderLine } = useHeaderStore();
  const { setError, clearError } = useTextfieldStore();

  const [nickname, setNickname] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsCarrot(false);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
  }, [setIsCarrot, setIsUnderLine, setPageName]);

  const handleValidateNickname = () => {
    const result = validateNickname(nickname);
    if (!result.isValid) {
      setError('nickname', result.type, result.message);
    } else {
      clearError('nickname');
    }
  };

  const renderContent = (activeTab) => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <TextfieldWrapperStyled>
              <label>대표자</label>
              <WETextField
                name="restaurantRegist-name"
                placeholder="대표자 이름을 입력하세요."
                value={nickname}
                showErrorMessageSpace={true}
                onChange={(e) => setNickname(e.target.value)}
              />
            </TextfieldWrapperStyled>

            <TextfieldWrapperStyled>
              <label>사업장 주소</label>
              <WETextField
                name="restaurantRegist-address"
                placeholder="사업장 주소를 입력하세요."
                value={nickname}
                showErrorMessageSpace={true}
                onChange={(e) => setNickname(e.target.value)}
              />
            </TextfieldWrapperStyled>

            <TextfieldWrapperStyled>
              <label>전화번호</label>
              <WETextField
                name="restaurantRegist-phone"
                placeholder="전화번호를 입력하세요."
                value={nickname}
                showErrorMessageSpace={true}
                onChange={(e) => setNickname(e.target.value)}
              />
            </TextfieldWrapperStyled>

            <TextfieldWrapperStyled>
              <label>매장명</label>
              <WETextField
                name="restaurantRegist-restaurantName"
                placeholder="매장명을 입력하세요."
                value={nickname}
                showErrorMessageSpace={true}
                onChange={(e) => setNickname(e.target.value)}
              />
            </TextfieldWrapperStyled>

            <TextfieldWrapperStyled>
              <label>업종</label>
              <WETextField
                name="restaurantRegist-businessType"
                placeholder="업종을 입력하세요."
                value={nickname}
                showErrorMessageSpace={true}
                onChange={(e) => setNickname(e.target.value)}
              />
            </TextfieldWrapperStyled>
          </>
        );
      case 1:
        return <></>;
      default:
        return null;
    }
  };

  return (
    <RestaurantRegistPageStyled>
      <TabWrapperStyled>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </TabWrapperStyled>

      <TextfieldsStyled>{renderContent(activeTab)}</TextfieldsStyled>

      <button className="testButton" onClick={handleValidateNickname}>
        확인
      </button>
    </RestaurantRegistPageStyled>
  );
};

export default RestaurantRegistPage;
