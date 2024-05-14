import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { useStore } from "../hooks";
import Loading from "../components/Loading/Loading";
import returnRoutes from "../utils/returnRoleRoutes";
import { observer } from "mobx-react-lite";
import routes from "./routes";

export const Router = observer(() => {
  const { auth } = useStore();
  const [theme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return (
    <Routes>
      {routes.map((route, i) => {
        return (
          <Route
            key={i}
            path={route?.path}
            element={
              <Suspense fallback={<Loading />}>
                {route?.element ? (
                  route?.isPrivate ? (
                    <PrivateRoute>
                      <route.element
                        routes={route?.subRoutes}
                        subRoutes={route?.subRoutes}
                      />
                    </PrivateRoute>
                  ) : (
                    <route.element subRoutes={route?.subRoutes} />
                  )
                ) : null}
              </Suspense>
            }
          >
            {route?.subRoutes?.map((subRoute, index) => {
              if (subRoute?.isNavigate) {
                return (
                  <Route
                    key={index}
                    path={subRoute?.path}
                    element={<Navigate to={subRoute.to} />}
                  />
                );
              } else
                return (
                  <Route
                    key={index}
                    path={subRoute.path}
                    element={<subRoute.element />}
                  >
                    {subRoute?.subRoutes?.map((subRoute, idx) => {
                      return (
                        <Route
                          key={index}
                          path={subRoute.path}
                          element={<subRoute.element />}
                        />
                      );
                    })}
                  </Route>
                );
            })}
          </Route>
        );
      })}

      <Route
        path={"*"}
        element={<Navigate to={auth.isLogged ? "/" : "/auth/login"} />}
      />
    </Routes>
  );
});
