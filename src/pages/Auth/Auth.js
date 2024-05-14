import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="h-screen min-h-full dark:bg-gray-900 bg-gray-200">
      <Outlet />
    </div>
  );
};

export default Auth;
