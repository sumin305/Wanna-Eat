import {
  DropdownContainer,
  DropdownLabelStyled,
  IconStyled,
  DropdownSelectOptions,
  DropdownSelectOption,
} from './WEDropdown';
import ArrowUp from '../../../assets/icons/common/arrow-up.svg';
import ArrowDown from '../../../assets/icons/common/arrow-down.svg';

const WEDropdown = ({ useDropdownStore, placeholder, onSelect }) => {
  const {
    width,
    height,
    setIsShowOption,
    setSelectedId,
    isShowOption,
    items,
    selectedId,
  } = useDropdownStore();

  const handleLabelClick = () => {
    setIsShowOption(!isShowOption);
  };

  const handleOptionClick = (index) => {
    setSelectedId(index);
    if (onSelect) {
      onSelect(items[index]);
    }
    setIsShowOption(false);
  };

  return (
    <DropdownContainer width={width} onClick={handleLabelClick}>
      <DropdownLabelStyled height={height}>
        <div>{selectedId == -1 ? placeholder : `${items[selectedId]}`}</div>
        <IconStyled src={isShowOption ? ArrowUp : ArrowDown} />
      </DropdownLabelStyled>
      <DropdownSelectOptions isShowOption={isShowOption}>
        {items.map((item, index) => {
          return (
            <DropdownSelectOption
              height={height}
              key={index}
              onClick={() => handleOptionClick(index)}
            >
              {item}
            </DropdownSelectOption>
          );
        })}
      </DropdownSelectOptions>
    </DropdownContainer>
  );
};

export default WEDropdown;
