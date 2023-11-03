import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import UseAuth from "../../Hook/UseAuth";
// import { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
  // const { user, logout } = useContext(AuthContext);
  const {user,logout} = UseAuth()
  const handleLogout = () =>{
    logout()
    .then((res) => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }
  const navItems = (
    <>
      <NavLink
        to="/"
        style={({ isActive, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold " : "",
            color: isActive ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        style={({ isActive, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        Login
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <img src={logo} alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">{navItems}</ul>
      </div>
      <div className="navbar-end gap-5">
        {user ? (
         <>
          <Link to='/bookings'><button className="btn btn-outline btn-success">Booking</button></Link>
          <button onClick={handleLogout} className="btn  btn-success">Logout</button>
         </>
        ) : (
          <Link to='/login'><button className="btn  btn-success">login</button></Link>
        )}
        <button className="btn btn-outline btn-success">Appointment</button>
      </div>
    </div>
  );
};

export default Navbar;
