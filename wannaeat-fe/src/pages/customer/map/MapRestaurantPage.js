import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const MapRestaurantBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background: ${theme.color.primary};
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 15%;
`;

const SearchWrapper = styled.div`
  position: relative;
  background: ${theme.color.primary};
  border-radius: 0 0 5px 5px;
  display: flex;
  top: 10%;
  align-items: center;
  justify-content: center;
  width: 90%;
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
  width: 100%;
  height: 75%;
`;

const FilterButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isEven ? theme.color.white : theme.color.primary};
  color: ${(props) => (props.isEven ? theme.color.primary : theme.color.white)};
  font-size: ${theme.fontSize.px10};
  padding: 1.5% 3%;
  margin-top: 1rem;
  border: 1px solid ${theme.color.white};
  border-radius: ${theme.borderRadius.default};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  gap: 0.5rem;

  @media (min-width: 480px) {
    > * {
      width: 480px;
      display: flex;
      align-items: row;
    }
  }
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
