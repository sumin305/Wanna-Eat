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
import Card from 'assets/icons/common/Card.png';
import Edit from 'assets/icons/common/Edit.png';
import Setting from 'assets/icons/common/Setting.png';
import useMyInfoStore from 'stores/customer/useMyInfoStore.js';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import { useNavigate } from 'react-router-dom';
const MyInfoPage = () => {
  const { nickname, email, phone, setNickname, setEmail, setPhone } =
    useMyInfoStore();
  const navigate = useNavigate();
  const { setPageName } = useHeaderStore();
  useEffect(() => {
    const fetchMyInfo = async () => {
      const response = await getMyInfo();
      if (response && response.status === 200) {
        console.log(response);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        console.log(typeof nickname);
      } else {
        console.error('getMyInfo error:', response);
      }
    };
    fetchMyInfo();
    setPageName('내 정보');
  }, []);

  const handleCardManageButtonClick = () => {
    navigate('/customer/card-manage');
  };
  const handleNicknameChangeButtonClick = () => {
    navigate('/customer/nickname-edit');
  };

  const handlePasswordChangeButtonClick = () => {
    navigate('/customer/password-edit');
  };
  const handleLogoutButtonClick = async () => {
    const result = await logout();
    console.log(result);
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
        <UserButtonItem onClick={handleCardManageButtonClick}>
          <UserButtonItemImg src={Card} />
          <UserButtonItemText>카드 관리</UserButtonItemText>
        </UserButtonItem>

        <UserButtonItem onClick={handleNicknameChangeButtonClick}>
          <UserButtonItemImg src={Edit} />
          <UserButtonItemText>닉네임 변경</UserButtonItemText>
        </UserButtonItem>

        <UserButtonItem onClick={handlePasswordChangeButtonClick}>
          <UserButtonItemImg src={Setting} />
          <UserButtonItemText>비밀번호 변경</UserButtonItemText>
        </UserButtonItem>
      </UserButtonBox>

      <UserLogoutButton onClick={handleLogoutButtonClick}>
        로그아웃
      </UserLogoutButton>
    </UserInfoContainer>
  );
};

export default MyInfoPage;
