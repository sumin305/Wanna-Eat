import styled from '@emotion/styled';
import theme from 'style/common/theme';

const UserInfoContainer = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  justify-items: center;
  > * {
    margin: 1rem 0;
  }
`;

const UserInfoBox = styled.div`
  border: 1px solid ${theme.color.gray};
  border-radius: 5px;
`;

const UserProfileBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1rem;

  @media (min-width: 480px) {
    margin: 3rem;
  }
`;

const UserProfileImage = styled.img`
  width: 43px;
  height: 43px;
`;

const UserProfileText = styled.p`
  display: flex;
  margin: 1rem;
  font-size: ${theme.fontSize.px17};
  font-weight: bold;
  color: ${theme.color.primary};

  @media (min-width: 480px) {
    font-size: 1.5rem;
  }
`;

const UserProfileInfo = styled.p`
  margin: 1rem;
  font-size: ${theme.fontSize.px11};
  color: #747474;

  @media (min-width: 480px) {
    margin: 2rem 3rem;
  }

  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const UserButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.color.gray};
  border-radius: 5px;
  padding: 1rem;
  @media (min-width: 480px) {
    padding: 2rem 3rem;
  }
`;

const UserButtonItem = styled.div`
  text-align: center;
`;

const UserButtonItemImg = styled.img`
  width: 45px;
  height: 45px;
`;

const UserButtonItemText = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.px8};
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const UserLogoutButton = styled.button`
  background-color: white;
  border: none;
  font-size: ${theme.fontSize.px8};
  color: ${theme.color.disabled};
  display: flex;
  text-align: center;
  align-self: center;
  height: 30%;
  padding-top: 30%;

  @media (min-width: 480px) {
    font-size: 1rem;
    padding-top: 10%;
  }
`;

export {
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
};
