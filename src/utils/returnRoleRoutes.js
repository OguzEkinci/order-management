import routes from "../router/routes";

const returnRoutes = (roles = []) => {
  console.log(roles, "roles");
  const newRoutes = routes
    .map((route) => {
      const subRoutes = route?.subRoutes?.filter((a) => {
        return (
          a.role == "public"
        );
      });

      if (route.role == "public") {
        return {
          ...route,
          subRoutes: subRoutes,
        };
      } else {
        return undefined;
      }
    })
    .filter((a) => a && a);

  return newRoutes;
};

export default returnRoutes;
