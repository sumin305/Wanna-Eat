import styled from '@emotion/styled/macro';
import WETabbar from './layout/common/WETabbar/WETabbar';
import TopPage from './pages/TopPage';

const Main = () => {

    const AppContainer = styled.div`
        @media (min-width: 480px) {
            .app-container {
            flex-direction: column; /* 세로 방향 정렬 */
            justify-content: center; /* 수직 가운데 정렬 */
            align-items: center; /* 수평 가운데 정렬 */
            height: 100vh; /* 뷰포트 전체 높이를 채움 */
            }

            .app-container > * {
            justify-content: center;
            margin: 0;
            }
        }
    `;

    return (
        <div>
            <AppContainer>
                <TopPage />
                <WETabbar />
            </AppContainer>
        </div>
    ) 
}

export default Main;