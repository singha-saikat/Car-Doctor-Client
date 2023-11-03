import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../components/errorPage/ErrorPage";
import Home from "../components/Pages/Home";
import Login from "../components/Pages/Login";
import SignUp from "../components/Pages/SignUp";
import Checkout from "../components/Pages/Checkout";
import Bookings from "../components/Pages/Bookings";
import PrivateRoutes from "../components/Pages/PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/signUp",
          element: <SignUp/>,
        },
        {
          path: "checkout/:id",
          element: <PrivateRoutes><Checkout/></PrivateRoutes>,
        },
        {
          path: "/bookings",
          element: <PrivateRoutes><Bookings/></PrivateRoutes>,
        },
      ],
    },
  ]);
   export default router ;