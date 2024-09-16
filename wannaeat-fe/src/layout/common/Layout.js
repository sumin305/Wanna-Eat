import styled from '@emotion/styled/macro';

const Layout = styled.div`
  width: 100vw;
  height: 100vh;

  @media (min-width: 480px) {
    display: flex;
    width: 480px;
    justify-self: center;
  }
`;

export default Layout;
