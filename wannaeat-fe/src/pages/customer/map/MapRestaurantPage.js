import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const MapRestaurantBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background: ${theme.color.primary};
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 10%;
`;

const SearchWrapper = styled.div`
  position: relative;
  background: ${theme.color.primary};
  border-radius: 0 0 5px 5px;
  display: flex;
  top: 10%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 90vw;
  height: 5vh;
  padding-left: 0.3rem;
  border-radius: 5px;
  border: none;
  font-size: ${theme.fontSize.px13};
  ::placeholder {
    color: ${theme.color.disabled};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 1.5rem;
  height: 3vh;
  cursor: pointer;
  color: white;
  transform: translateY(-50%);
  margin-top: 15px;
`;

const MapBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
`;

const FilterButton = styled.span`
  margin-top: 0.5rem;
  background-color: ${theme.color.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${theme.fontSize.px13};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row; // 버튼들을 한 줄로 정렬
  gap: 0.5rem; // 버튼 간의 간격
`;
export {
  MapRestaurantBox,
  MapBox,
  HeaderContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  FilterButton,
  ButtonContainer,
};
