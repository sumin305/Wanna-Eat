import styled from '@emotion/styled';
import theme from 'style/common/theme';
const CardRegistPageContainer = styled.div`
  background: ${theme.color.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 13%;
`;

const CardRegistItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  scroll-y: auto;
  width: 100%;
  height: 20vh;
  margin: 5px 0;
  align-items: center;
`;

const CardRegistItemImage = styled.img`
  width: 3rem;
  height: 5rem;
  margin-left: 1rem;

  @media (min-width: 480px) {
    width: 5rem;
    height: 8rem;
    margin: 0 1rem;
  }
`;

const CardInfoWrapper = styled.div`
  margin: 1.3rem 0.5rem 1.3rem 0.8rem;
  height: 5rem;
  width: 13rem;
  @media (min-width: 480px) {
    margin: 2rem 0;
    height: 8rem;
    width: 20rem;
  }
`;

const CardInfoTitle = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSize.px13};
  margin: 0.5rem 0;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px21};
  }
`;

const CardInfoText = styled.p`
  font-size: ${theme.fontSize.px9};
  color: #c0c0c0;
  margin: 0.1rem 0;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
    margin: 0.3rem 0;
  }
`;

const CardRegistButton = styled.button`
  border: none;
  background: none;
  margin-right: 1rem;
`;

export {
  CardRegistPageContainer,
  CardRegistItem,
  CardRegistItemImage,
  CardInfoWrapper,
  CardInfoTitle,
  CardInfoText,
  CardRegistButton,
};
