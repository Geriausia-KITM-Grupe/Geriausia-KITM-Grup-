import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="main-section">{children}</main>
    <Footer />
  </>
);

export default Layout;
