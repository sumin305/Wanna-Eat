import styled from '@emotion/styled/macro';

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;

  @media (min-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 480px;
    justify-self: center;
  }
`;

export default Layout;
