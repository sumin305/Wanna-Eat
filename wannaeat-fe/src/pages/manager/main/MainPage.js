import styled from '@emotion/styled';
import theme from 'style/common/theme.js';
import { keyframes } from '@emotion/react';

import { ReactComponent as ManagerImg } from 'assets/icons/header/logo.svg';

const MainPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80vh;
  flex-shrink: 0;

  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 480px) {
    height: 80vh;
    overflow-y: scroll;
  }
`;

const GoToSeatDecorateStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: ${theme.color.primary};
  border-radius: 0 0 0.4375rem 0.4375rem;

  flex-shrink: 0;
`;

const GoToSeatDecorateButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 70%;
  background-color: white;
  border-radius: 11px;
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.primary};
  cursor: pointer;
  user-select: none;

  &:active {
    cursor: pointer;
    transform: scale(0.98);
  }

  @media (min-width: 480px) {
    width: 90%;
    height: 70%;
    background-color: white;
    border-radius: 11px;
    font-size: ${theme.fontSize.px25};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.color.primary};
    cursor: pointer;
    user-select: none;

    &:active {
      cursor: pointer;
      transform: scale(0.98);
    }
  }
`;

const InfoFormStyled = styled.div``;

const InputWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LabelStyled = styled.div`
  font-size: ${theme.fontSize.px11};
  font-weight: ${theme.fontWeight.bold};
  margin-block: 25px;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px17};
    font-weight: ${theme.fontWeight.bold};
    margin-block: 35px;
  }
`;

const InputFloorWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .floor-label {
    font-size: ${theme.fontSize.px11};
    font-weight: ${theme.fontWeight.bold};
    margin-left: 8px;
  }

  @media (min-width: 480px) {
    display: flex;
    flex-direction: row;
    align-items: center;

    .floor-label {
      font-size: ${theme.fontSize.px17};
      font-weight: ${theme.fontWeight.bold};
      margin-left: 10px;
    }
  }
`;

const InputFloorStyled = styled.input`
  width: 5.75rem;
  height: 25px;
  border: 0.5px solid #d4d4d4;
  border-radius: 0.3rem;
  font-size: 0.813rem;
  padding: 0 10px;
  text-align: center;

  :active {
    outline-color: ${theme.color.primary};
    border-color: ${theme.color.primary};
  }

  :hover {
    outline-color: ${theme.color.primary};
    border-color: ${theme.color.primary};
  }

  :focus {
    outline-color: ${theme.color.primary};
    border-color: ${theme.color.primary};
  }

  @media (min-width: 480px) {
    width: 6.75rem;
    height: 30px;
    border: 0.5px solid #d4d4d4;
    border-radius: 0.3rem;
    font-size: 0.813rem;
    padding: 0 10px;
    text-align: center;

    :active {
      outline-color: ${theme.color.primary};
      border-color: ${theme.color.primary};
    }

    :hover {
      outline-color: ${theme.color.primary};
      border-color: ${theme.color.primary};
    }

    :focus {
      outline-color: ${theme.color.primary};
      border-color: ${theme.color.primary};
    }
  }
`;

const SettingModalContainer = styled.div`
  background-color: ${theme.color.white};
  position: fixed;
  top: 25%;
  height: 40%;
  width: 80%;
  justify-self: center;

  border-radius: ${theme.borderRadius.default};
  padding: 0.5rem 0;

  @media (min-width: 480px) {
    width: 400px;
    justify-self: center;
  }

  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;

const HrStyled = styled.hr`
  color: ${theme.color.primary};
  background: ${theme.color.primary};
  height: 2px;
  width: 100%;
  border: none;
  margin-bottom: 0.5rem;
  align-self: center;
`;

const ModalTitleStyled = styled.div`
  font-size: ${theme.fontSize.px11};
  font-weight: ${theme.fontWeight.bold};
  height: 1.5rem;

  @media (min-width: 480px) {
    text-align: start;
    font-size: ${theme.fontSize.px13};

    font-weight: ${theme.fontWeight.bold};
    height: 1.5rem;
  }
`;

const ModalContentWrapper = styled.div`
  z-index: ${theme.zIndex.modal};
  padding: 1rem;
`;

const ModalOverlayStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndex.blackLayout};
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  display: ${({ isModalOpen }) => {
    if (!isModalOpen) return 'none';
  }};
  @media (min-width: 480px) {
    width: 480px;
    justify-content: center;
  }
`;

const ReservationCountStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 93%;
  height: 10%;

  border-radius: 0.5rem 0.5rem var(--Corner-None, 0rem) var(--Corner-None, 0rem);
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  padding-left: 5%;

  font-size: ${theme.fontSize.px15};
  font-weight: ${theme.fontWeight.bold};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px21};
    font-weight: ${theme.fontWeight.bold};
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingIconWrapper = styled.div`
  width: 22px;
  height: 24px;
  display: inline-block;
  cursor: pointer;
  animation: ${(props) => (props.isRotating ? rotateAnimation : 'none')} 1s
    ease-in-out;

  transform-origin: 50% 50%;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const SuggestionMessageStyled = styled.div`
  font-size: ${theme.fontSize.px27};
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 5%;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px40};
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;

const ManagerImgWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const ManagerImgStyled = styled(ManagerImg)`
  width: 320px;
  height: 320px;
  margin-right: 34px;

  @media (min-width: 480px) {
    width: 500px;
    height: 500px;
    margin-right: 34px;
  }
`;

export {
  MainPageStyled,
  GoToSeatDecorateStyled,
  GoToSeatDecorateButtonStyled,
  InfoFormStyled,
  LabelStyled,
  InputWrapperStyled,
  InputFloorWrapperStyled,
  InputFloorStyled,
  SettingModalContainer,
  ButtonWrapper,
  HrStyled,
  ModalTitleStyled,
  ModalContentWrapper,
  ModalOverlayStyled,
  ReservationCountStyled,
  rotateAnimation,
  RotatingIconWrapper,
  ManagerImgWrapperStyled,
  ManagerImgStyled,
  SuggestionMessageStyled,
};
