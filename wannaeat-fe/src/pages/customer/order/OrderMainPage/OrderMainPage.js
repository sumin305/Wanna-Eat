import styled from '@emotion/styled';
import theme from 'style/common/theme';

export const OrderContainer = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 7px 0;
`;

export const CheckBox = styled.div`
  display: flex;
  margin-left: 4%;
`;

export const CheckText = styled.p`
  font-size: ${theme.fontSize.px13};
`;

export const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5vh 0 0 0;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  align-items: center;
`;

export const TotalMenuP = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-left: 0.5rem;
`;

export const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  & > button {
    padding: 5px;
    border-radius: 9px;
    border: 1.5px solid rgba(192, 192, 192, 1);
    font-size: ${theme.fontSize.px11};
    font-weight: ${theme.fontWeight.default};
    color: rgba(192, 192, 192, 1);
  }
`;

export const FoodDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LineDiv = styled.div`
  border: 1px solid rgba(212, 212, 212, 1);
  width: 100%;
  margin-top: 0.5vh;
  margin-bottom: 1.5vh;
`;

export const MenuDiv = styled.div`
  padding: 0.5rem;
  height: ${(props) => (props.role ? '53vh' : '61vh')};
  overflow-y: auto;
  -ms-overflow-style: none; /* 인터넷 익스플로러용 스크롤바 숨김 */
  scrollbar-width: none; /* 파이어폭스용 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 엣지 등 웹킷 브라우저용 스크롤바 숨김 */
  }
`;

export const MenuImageWrapper = styled.div`
  width: 65px;
  height: 65px;
  display: flex;
  margin-right: 0.5rem;
  align-self: center;
`;
export const MenuImg = styled.img`
  width: 65px;
  border-radius: 6px;
`;

export const FoodInfoDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 3px 0;
`;

export const FoodCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeleteImg = styled.img`
  position: absolute;
  top: 3%;
  right: 5%;
  cursor: pointer;
`;

export const FoodInfoTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FoodInfoCountDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  justify-content: space-between;
  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

export const FoodPriceP = styled.p`
  font-size: ${theme.fontSize.px15};
  font-weight: ${theme.fontWeight.bold};
`;

export const MenuNameP = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: bold;
  margin-bottom: 3px;
`;

export const FoodInfoCountP = styled.p`
  border: 1px solid rgba(212, 212, 212, 1);
  border-radius: 5px;
  padding: 2px;
  margin: 2px;
  font-size: ${theme.fontSize.px11};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;

export const FoodInfoCountLeftBtn = styled.button`
  background-color: white;
  color: rgba(212, 212, 212, 1);
  border: 1px solid rgba(212, 212, 212, 1);
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FoodInfoCountRightBtn = styled.button`
  background-color: white;
  color: rgba(212, 212, 212, 1);
  border: 1px solid rgba(212, 212, 212, 1);
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FoodInfoBottomDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextP = styled.p`
  font-size: ${theme.fontSize.px11};
  display: inline-block;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;

export const PeopleP = styled.p`
  font-size: ${theme.fontSize.px11};
  color: #424242;
  display: inline-block;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;
export const TotalPriceDiv = styled.div`
  display: flex;
  justify-content: right;
`;

export const TotalPriceP = styled.p`
  font-size: ${theme.fontSize.px15};
  font-weight: ${theme.fontWeight.bold};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
