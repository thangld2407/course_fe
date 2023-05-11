import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";

function LayoutIndex() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  const current_time = new Date().getTime();
  const expired_in = localStorage.getItem("expired_in");
  if (token && current_time > expired_in) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default LayoutIndex;
