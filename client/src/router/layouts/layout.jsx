import React from "react";
import NavBar from "../../components/Navbar/page";
import SideBar from "../../components/sideBar/page";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Chat from "../../components/Chat/page";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequireAuth() {
  const { currentUser, currentToken } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="content">
          <div className="sideBar">
            <SideBar />
          </div>
          <div className="OutLet">
            <Outlet />
          </div>
          <div className="chatSide">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
