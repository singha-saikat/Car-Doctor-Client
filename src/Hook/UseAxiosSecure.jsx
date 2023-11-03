import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

const UseAxiosSecure = () => {
  const { logout } = UseAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("traced error", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("logout the user");
          logout()
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
  }, [logout]);
  return axiosSecure;
};

export default UseAxiosSecure;
