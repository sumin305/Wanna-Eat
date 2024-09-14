import { useMemo, useEffect } from "react";
import useDropdownStore from "../../../stores/dropdown/useDropdownStore";
import { DropdownContainer, DropdownLabelStyled, DropdownSelectOptions, DropdownSelectOption} from './WEDropdown';
import theme from "../../../style/common/theme";
const WEDropdown = () =>  {
    const {setIsShowOption, setItems, setSelectedId, isShowOption, items, selectedId} = useDropdownStore();
    const handleLabelClick = e => {
        setIsShowOption(!isShowOption)
    }

    useEffect(() => {
        setItems(['보쌈', '족발', '치킨'])
    }, [])

    const handleOptionClick = (index) => {
        console.log(index)
        setIsShowOption(false)
        setSelectedId(index)
    }

    const defaultLabelText = '메뉴를 입력하세요'
     return (
        <DropdownContainer width={'93%'} onClick={handleLabelClick}>
        <DropdownLabelStyled height={'20px'} >
            {
                selectedId == -1 ? `${defaultLabelText}` : `${items[selectedId]}`
            }
        </DropdownLabelStyled>
        <DropdownSelectOptions isShowOption={isShowOption}>
            {
                items.map((item, index) => {
                    return (<DropdownSelectOption height={'20px'} key={index} onClick={() => handleOptionClick(index)}>{item}</DropdownSelectOption>)
                })
            }
        </DropdownSelectOptions>

        </DropdownContainer>
    )
}

export default WEDropdown;