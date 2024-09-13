import Button from "../../button/WEButton/WEButton";
import { SheetModalTitleWrapper, SheetModalStyled, SheetModalTitleStyled, HrStyled, SheetModalSelectTitleStyled, SheetModalSelectWrapper } from "./WESheetModal";

const WESheetModal = () => {
    return (
        <SheetModalStyled>
            <SheetModalTitleWrapper>
                <SheetModalTitleStyled>식당 필터링</SheetModalTitleStyled>
                <HrStyled></HrStyled>
            </SheetModalTitleWrapper>
            <div>
                <SheetModalSelectWrapper>
                    <SheetModalSelectTitleStyled>
                        인원수
                    </SheetModalSelectTitleStyled>
                    <div>
                    <input style={{width: '150px'}} type="number"/>명
                    </div>
                </SheetModalSelectWrapper>
                <SheetModalSelectWrapper>
                    <SheetModalSelectTitleStyled>
                        방문 날짜
                    </SheetModalSelectTitleStyled>
                    <div>
                        <input type="date"/>
                    </div>
                </SheetModalSelectWrapper>
                <SheetModalSelectWrapper>
                    <SheetModalSelectTitleStyled>
                        방문 시간
                    </SheetModalSelectTitleStyled>
                    
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
                </SheetModalSelectWrapper>
                <SheetModalSelectWrapper>
                    <SheetModalSelectTitleStyled>
                        카테고리
                    </SheetModalSelectTitleStyled>
                    <div>
                        <select>
                            <option>보쌈</option>
                            <option>찜·탕·찌개</option>
                            <option>회·일식</option>
                            <option>돈까스</option>
                        </select>
                    </div>
                </SheetModalSelectWrapper>
            </div>
            <Button size='long'>필터링</Button>            

        </SheetModalStyled>
    )
}

export default WESheetModal;