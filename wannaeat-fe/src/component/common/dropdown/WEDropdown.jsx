import { useMemo, useEffect } from "react";
import useDropdownStore from "../../../stores/common/dropdown/useDropdownStore";
import {   DropdownContainer, DropdownLabelStyled,
    IconStyled,
    DropdownSelectOptions,
    DropdownSelectOption,
  } from './WEDropdown';
import theme from "../../../style/common/theme";
import ArrowUp from '../../../assets/icons/arrow-up.svg'
import ArrowDown from '../../../assets/icons/arrow-down.svg'

const WEDropdown = () =>  {
    const {width, height, setIsShowOption, setItems, setSelectedId, isShowOption, items, selectedId} = useDropdownStore();
    const handleLabelClick = e => {
        setIsShowOption(!isShowOption)
    }

    useEffect(() => {
        setItems(['보쌈', '족발', '치킨'])
    }, [])

    const handleOptionClick = (index) => {
        setIsShowOption(false)
        setSelectedId(index)
    }

    const defaultLabelText = '메뉴를 입력하세요'
     return (
        <DropdownContainer width={width} onClick={handleLabelClick}>
        <DropdownLabelStyled height={height} >
            <div>
            {
                selectedId == -1 ? `${defaultLabelText}` : `${items[selectedId]}`
            }
            </div>
            <IconStyled src={isShowOption ? ArrowUp : ArrowDown}/>
        </DropdownLabelStyled>
        <DropdownSelectOptions isShowOption={isShowOption}>
            {
                items.map((item, index) => {
                    return (<DropdownSelectOption height={height} key={index} onClick={() => handleOptionClick(index)}>{item}</DropdownSelectOption>)
                })
            }
        </DropdownSelectOptions>

        </DropdownContainer>
    )
}

export default WEDropdown;