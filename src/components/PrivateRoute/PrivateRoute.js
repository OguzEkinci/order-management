import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../../hooks/index";
import { observer } from "mobx-react-lite";
// import { useEffect } from "react";

const PrivateRoute = observer(({ children }) => {
  const { auth } = useStore();
  //   const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!auth.access_token && !auth.isLogged) {
    return <Navigate to={"/auth/login"} />;
  } else {
    if (auth?.userGetLoading) {
      return (
        <div className="w-screen h-screen justify-center items-center">
          loading..
        </div>
      );
    } else {
      if (pathname === "/auth/login") {
        return <Navigate to={"/"} />;
      } else {
        return children;
      }
    }
  }
});

export default PrivateRoute;
