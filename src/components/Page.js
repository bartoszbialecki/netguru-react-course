import { Layout as AntLayout } from "antd";
import styled from "styled-components";
import ArticleModal from "./ArticleModal";
import GoogleMap from "./GoogleMap";
import Header from "./Header";

const { Content, Footer: AntFooter } = AntLayout;

const Layout = styled(AntLayout)`
  min-height: 100vh;
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
      <Header />
      <MainContent>
        <ArticleModal />
        <GoogleMap />
      </MainContent>
      <Footer>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
