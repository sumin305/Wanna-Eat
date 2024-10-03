import styled from '@emotion/styled';
import theme from 'style/common/theme';
const MyZzimPageContainer = styled.div`
  background: ${theme.color.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 13%;
`;

const MyZzimItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  scroll-y: auto;
  width: 100%;
  height: 20vh;
  margin: 5px 0;
  align-items: center;
`;

const MyZzimItemImage = styled.img`
  height: 20vh;
  width: 20vh;
  margin-left: 1rem;

  @media (min-width: 480px) {
    height: 20vh;
    width: 20vh;
    margin: 0 1rem;
  }
`;

const MyZzimInfoWrapper = styled.div`
  margin: 1.3rem 0.5rem 1.3rem 0.8rem;
  height: 5rem;
  width: 13rem;
  @media (min-width: 480px) {
    margin: 2rem 0;
    height: 8rem;
    width: 20rem;
  }
`;

const MyZzimInfoTitle = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: ${theme.fontSize.px13};
  margin-top: 0.5rem;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px21};
  }
`;

const MyZzimInconImage = styled.img`
  width: 1rem;
  height: 1rem;
  @media (min-width: 480px) {
    width: 2rem;
    height: 2rem;
  }
`;

const MyZzimInfoText = styled.p`
  font-size: ${theme.fontSize.px9};
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

const MyZzimReservationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 2rem;
  align-items: center;
  @media (min-width: 480px) {
    margin-top: 3rem;
    margin-right: 1rem;
  }
`;

const MyZzimReservationCount = styled.p`
  font-size: ${theme.fontSize.px8};
  font-weight: bold;
  border: 1px solid ${theme.color.primary};
  border-radius: 5px;
  padding: 3px;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px10};
  }
`;
const MyZzimReservationButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSize.px10};
  color: ${theme.color.secondary};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;
export {
  MyZzimPageContainer,
  MyZzimItem,
  MyZzimItemImage,
  MyZzimInfoWrapper,
  MyZzimInfoTitle,
  MyZzimInfoText,
  MyZzimInconImage,
  MyZzimReservationWrapper,
  MyZzimReservationCount,
  MyZzimReservationButton,
};
