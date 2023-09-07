import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
const GuestLayout = () => {
  return (
    <div>
      <Header />
      <div className="container my-4">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
