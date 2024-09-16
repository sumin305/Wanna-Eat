/** @jsxImportSource @emotion/react */
import Button from '../../button/WEButton/WEButton';
import { css } from '@emotion/react';
import SheetModalContainer from './WESheetModal.js';
import {  HrStyled,
  ModalTitleWrapper,
  ModalTitleStyled,
  ModalSelectTitleStyled,
  ModalSelectWrapper
} from '../../../../component/common/modal/WEModal.js'
import useModalStore from '../../../../stores/modal/useModalStore';

const WESheetModal = () => {

  const {close, title} = useModalStore();
  return (
    <SheetModalContainer>
      <ModalTitleWrapper>
        <ModalTitleStyled>{title}</ModalTitleStyled>
        <HrStyled></HrStyled>
      </ModalTitleWrapper>
      <div>
        <ModalSelectWrapper>
          <ModalSelectTitleStyled>인원수</ModalSelectTitleStyled>
          <div>
            <input style={{ width: '150px' }} type="number" />명
          </div>
        </ModalSelectWrapper>
        <ModalSelectWrapper>
          <ModalSelectTitleStyled>방문 날짜</ModalSelectTitleStyled>
          <div>
            <input type="date" />
          </div>
        </ModalSelectWrapper>
        <ModalSelectWrapper>
          <ModalSelectTitleStyled>방문 시간</ModalSelectTitleStyled>

          <div>
            <select>
              <option>17:00</option>
              <option>17:30</option>
              <option>18:00</option>
              <option>18:30</option>
            </select>
            <select>
              <option>30분</option>
              <option>1시간</option>
              <option>1시간 30분</option>
              <option>2시간</option>
            </select>
          </div>
        </ModalSelectWrapper>
        <ModalSelectWrapper>
          <ModalSelectTitleStyled>카테고리</ModalSelectTitleStyled>
          <div>
            <select>
              <option>보쌈</option>
              <option>찜·탕·찌개</option>
              <option>회·일식</option>
              <option>돈까스</option>
            </select>
          </div>
        </ModalSelectWrapper>
      </div>
      <Button size="long" onClick={close}>
        필터링
      </Button>
    </SheetModalContainer>
  );
};

export default WESheetModal;
