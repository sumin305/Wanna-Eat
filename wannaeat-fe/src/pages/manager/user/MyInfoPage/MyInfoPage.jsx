import { getMyInfo, logout, editMyInfo } from 'api/customer/user';
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
import Zzim from 'assets/icons/header/zzim-off.svg';
import Setting from 'assets/icons/common/Setting.png';
import useMyInfoStore from 'stores/customer/useMyInfoStore.js';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import { useNavigate } from 'react-router-dom';
const MyInfoPage = () => {
  const { nickname, email, phone, setNickname, setEmail, setPhone } =
    useMyInfoStore();
  const navigate = useNavigate();
  const { setPageName, setIsShowLogo, setIsShowBackIcon, setActiveIcons } =
    useHeaderStore();
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
    setPageName('내 정보');
    setIsShowLogo(false);
    setIsShowBackIcon(false);
    setActiveIcons([]);
  }, []);

  const handleRestaurantManageButtonClick = () => {
    navigate('/manager/restaurant/restaurant-manage');
  };
  const handleNicknameChangeButtonClick = () => {
    navigate('/customer/nickname-edit');
  };

  const handleMyZzimButtonClick = () => {
    navigate('/customer/myzzim');
  };
  const handleLogoutButtonClick = async () => {
    const result = await logout();
    console.log(result);
    navigate('/');
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

        <UserButtonItem onClick={handleMyZzimButtonClick}>
          <UserButtonItemImg src={Zzim} />
          <UserButtonItemText>내가 찜한 식당</UserButtonItemText>
        </UserButtonItem>
      </UserButtonBox>

      <UserLogoutButton onClick={handleLogoutButtonClick}>
        로그아웃
      </UserLogoutButton>
    </UserInfoContainer>
  );
};

export default MyInfoPage;
