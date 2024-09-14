import styled from '@emotion/styled/macro';
import useDropdownStore from '../../../stores/dropdown/useDropdownStore';
import theme from '../../../style/common/theme';
const DropdownContainer = styled.div`
  position: relative;
  background-color: red;
  width: ${(props) => props.width};
  margin: 0 auto;
`;
const DropdownLabelStyled = styled.div`
  background-color: blue;
  height: ${(props) => props.height};
  font-size: ${theme.fontSize.px13};
`;

const DropdownSelectOptions = styled.ul`
  display: ${(props) => {
    if (!props.isShowOption) return 'none';
    return undefined;
  }};
`;

const DropdownSelectOption = styled.li`
  background-color: green;
  height: ${(props) => props.height};
  padding: 0;
  font-size: ${theme.fontSize.px13};
  list-style: none;
`;
export {
  DropdownContainer,
  DropdownLabelStyled,
  DropdownSelectOptions,
  DropdownSelectOption,
};
