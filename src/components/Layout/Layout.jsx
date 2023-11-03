import { Outlet } from "react-router-dom";
import Footer from "../Shared Pages/Footer";
import Navbar from "../Shared Pages/Navbar";


const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;