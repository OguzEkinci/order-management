import { Outlet } from "react-router";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Orders = ({ subRoutes }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !subRoutes.find((route) => route.isVisible) &&
      window.location.pathname === "/order-management"
    ) {
      navigate("/order-management/list");
    }
  }, []);

  return (
    <div className="h-screen min-h-full max-h-full dark:bg-gray-900 bg-gray-200 overflow-auto ">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default Orders;
