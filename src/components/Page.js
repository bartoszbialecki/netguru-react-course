import { Layout as AntLayout } from "antd";
import styled from "styled-components";
import GoogleMap from "./GoogleMap";

const { Header, Content, Footer: AntFooter } = AntLayout;

const Layout = styled(AntLayout)`
  min-height: 100vh;
`;

const Logo = styled.h2`
  color: #fff;
`;

const MainContent = styled(Content)`
  background: #fff;
`;

const Footer = styled(AntFooter)`
  text-align: center;
`;

export default function Page() {
  return (
    <Layout>
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <MainContent>
        <GoogleMap />
      </MainContent>
      <Footer>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
