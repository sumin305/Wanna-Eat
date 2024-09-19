import styled from '@emotion/styled/macro';
import useDropdownStore from '../../../stores/common/dropdown/useDropdownStore';
import theme from '../../../style/common/theme';

const DropdownContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  margin: 0 auto;
`;
const DropdownLabelStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${(props) => props.height};
  background-color: ${theme.color.white};
  font-size: ${theme.fontSize.px13};
  border-radius: 0.3rem;
  border: 0.5px solid #c0c0c0;
  padding: 0 10px;
  color: #414141;
  align-items: center;
`;

const IconStyled = styled.img`
  width: 14px;
  height: 14px;
`;

const DropdownSelectOptions = styled.ul`
  display: ${(props) => {
    if (!props.isShowOption) return 'none';
    return undefined;
  }};
`;

const DropdownSelectOption = styled.li`
  position: relative;
  height: ${(props) => props.height};
  background-color: ${theme.color.white};
  font-size: ${theme.fontSize.px13};
  list-style: none;
  border-radius: 0.3rem;
  border: 0.5px solid #c0c0c0;
  padding: 0 10px;
  color: #414141;
  align-content: center;

  :hover {
    color: ${theme.color.white};
    background-color: ${theme.color.primary};
  }
`;
export {
  DropdownContainer,
  DropdownLabelStyled,
  IconStyled,
  DropdownSelectOptions,
  DropdownSelectOption,
};
