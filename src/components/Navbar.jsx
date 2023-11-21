import React from "react";
import useLogoutUser from "../customHooks/useLogoutUser";
import Loader from "./Loader";
import { useProductsContext } from "../context/ProductsProvider";

const Navbar = () => {
  const { isLoading, isError, error, mutate } = useLogoutUser();
  const { user, handleUser } = useProductsContext();

  const handleLogoutMutation = () => {
    mutate();
    handleUser({
      userID: "",
      userName: "",
      userRole: "",
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <h1>{error?.response?.data?.msg}</h1>;

  return (
    <nav className="navbar">
      <div className="wrapper navbar-wrapper">
        <div className="navbar-logo">
          <h1>
            <span>Inventory</span>
            <span>Manager</span>
          </h1>
        </div>
        <div className="links">
          {user?.userName && (
            <button className="btn" onClick={handleLogoutMutation}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
