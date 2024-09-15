import useModalStore from "../../../../stores/modal/useModalStore"
import { css } from "@emotion/react";
import Button from "../../button/WEButton/WEButton";
import WESettingModalContainer from "./WESettingModal";
import {  HrStyled,
    ModalTitleWrapper,
    ModalTitleStyled,
    ModalSelectTitleStyled,
    ModalSelectWrapper
  } from '../../../../component/common/modal/WEModal.js'
  
const WESettingModal = () => {
    const {close, title} = useModalStore();

    return (
        <WESettingModalContainer>
            <ModalTitleWrapper>
                <ModalTitleStyled>{title}</ModalTitleStyled>
                <HrStyled></HrStyled>
            </ModalTitleWrapper>
            <div>
            <ModalSelectWrapper>
          <ModalSelectTitleStyled>크기</ModalSelectTitleStyled>
          <div>
          <select>
              <option>소형 (30m² 이하)</option>
              <option>중소형 (30m² ~ 50m²)</option>
              <option>중대형 (100m² ~ 150m²)</option>
              <option>대형 (150m² 이상)</option>
            </select>

          </div>
        </ModalSelectWrapper>
        <ModalSelectWrapper>
          <ModalSelectTitleStyled>층 수</ModalSelectTitleStyled>
          <div>
          <input style={{ width: '150px' }} type="number" />층
          </div>
        </ModalSelectWrapper>

            </div >
            <div >
            <Button size='long'>확인</Button>
            </div>
        </WESettingModalContainer>
    )

}

export default WESettingModal;