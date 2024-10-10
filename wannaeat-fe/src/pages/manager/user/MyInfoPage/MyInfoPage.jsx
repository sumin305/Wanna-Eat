import { getMyInfo, logout } from 'api/customer/user';
import { useEffect } from 'react';
import {
  UserInfoContainer,
  UserInfoBox,
  UserProfileBox,
  UserProfileImage,
  UserProfileText,
  UserProfileInfo,
  UserButtonBox,
  UserButtonItem,
  UserButtonItemImg,
  UserButtonItemText,
  UserLogoutButton,
} from './MyInfoPage.js';
import UserInfo from 'assets/icons/common/user-info.png';
import Manage from 'assets/icons/manager/user/manage.svg';
import Edit from 'assets/icons/common/Edit.png';
import useMyInfoStore from 'stores/customer/useMyInfoStore.js';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import { useNavigate } from 'react-router-dom';
const MyInfoPage = () => {
  const { nickname, email, phone, setNickname, setEmail, setPhone } =
    useMyInfoStore();
  const navigate = useNavigate();
  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setIsShowBackIcon,
    setActiveIcons,
    setIsUnderLine,
    setIconAction,
  } = useHeaderStore();
  useEffect(() => {
    const fetchMyInfo = async () => {
      const response = await getMyInfo();
      if (response && response.status === 200) {
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } else {
        console.error('getMyInfo error:', response);
      }
    };
    fetchMyInfo();
    setIsCarrot(false);
    setPageName('내 정보');
    setIsShowLogo(false);
    setIsShowBackIcon(false);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setIconAction([() => navigate('/manager/alarm')]);
  }, []);

  const handleRestaurantManageButtonClick = () => {
    navigate('/manager/restaurant/restaurant-manage');
  };
  const handleNicknameChangeButtonClick = () => {
    navigate('/manager/nickname-edit');
  };

  const handleLogoutButtonClick = async () => {
    const result = await logout();
    console.log(result);
    // 로컬스토리지에 restaurantId가 있을 경우 로그아웃 시 restaurantId 제거
    if (result.status === 200) {
      ['role', 'restaurantId', 'userKey'].forEach((key) => {
        window.localStorage.getItem(key) && window.localStorage.removeItem(key);
      });
      navigate('/');
    }
  };
  return (
    <UserInfoContainer>
      <UserInfoBox>
        <UserProfileBox>
          <UserProfileImage src={UserInfo} />
          <UserProfileText>
            {nickname}
            <p style={{ color: 'black' }}>님</p>
          </UserProfileText>
        </UserProfileBox>
        <UserProfileInfo>{email}</UserProfileInfo>
        <UserProfileInfo>{phone}</UserProfileInfo>
      </UserInfoBox>

      <UserButtonBox>
        <UserButtonItem onClick={handleRestaurantManageButtonClick}>
          <UserButtonItemImg src={Manage} />
          <UserButtonItemText>매장관리</UserButtonItemText>
        </UserButtonItem>

        <UserButtonItem onClick={handleNicknameChangeButtonClick}>
          <UserButtonItemImg src={Edit} />
          <UserButtonItemText>닉네임 변경</UserButtonItemText>
        </UserButtonItem>
      </UserButtonBox>

      <UserLogoutButton onClick={handleLogoutButtonClick}>
        로그아웃
      </UserLogoutButton>
    </UserInfoContainer>
  );
};

export default MyInfoPage;
