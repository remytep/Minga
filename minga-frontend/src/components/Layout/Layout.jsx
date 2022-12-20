import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
