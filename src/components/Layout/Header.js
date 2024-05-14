import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import routes from "../../router/routes";
import { useTranslation } from "react-i18next";
import ActionToggle from "../ActionToggle/ActionToggle";
import { config } from "../../config";
import PlusButtonForCreate from "../PlusButtonForCreate/PlusButtonForCreate";
import { Tooltip } from "@mantine/core";
import returnRoutes from "../../utils/returnRoleRoutes";
import { Breadcrumbs, Anchor } from "@mantine/core";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { t } = useTranslation();
  const userNavigation = [{ name: t("actions.signout"), key: "signout" }];
  const { auth } = useStore();
  const routeNavs = routes.map((route) => {
    return {
      name: t(`navigationItems.${route.name.toLocaleLowerCase()}`),
      href: route.path,
      icon: route.icon || BuildingStorefrontIcon,
      isVisible: route?.isVisible !== false ? true : false,
      current:
        route.path !== "/"
          ? window.location.pathname.includes(route.path)
          : window.location.pathname === route.path,
      subRoutes: route?.subRoutes?.map((subRoute) => {
        return {
          name: subRoute.isVisible
            ? t(
                `navigationItems.${route.name.toLocaleLowerCase()}-${subRoute.name.toLocaleLowerCase()}`,
              )
            : "",
          href: subRoute.path ? `${route.path}/${subRoute.path}` : route.path,
          icon: subRoute.icon,
          isVisible: subRoute.isVisible,
          current: window.location.pathname.includes(
            route.path + "/" + subRoute.path,
          ),
        };
      }),
    };
  });

  const [navs, setNavs] = useState(routeNavs);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (key) => {
    if (key === "signout") {
      auth.logout();
      navigate("/auth/login");
    }
  };
  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleOpenDropdown = (item) => {
    if (!item.subRoutes) {
      handleNavigate(item.href);
      return;
    } else {
      const nav = navs?.map((nav) => {
        if (nav.name === item.name) {
          return { ...nav, selected: !nav.selected };
        } else {
          return { ...nav, selected: false };
        }
      });
      setNavs(nav);
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-red-600 dark:bg-red-800 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <h1
                        className="text-2xl font-bold cursor-pointer"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Paket Mutfak
                      </h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {navs.map((item) =>
                              !item?.isVisible ? null : (
                                <li key={item.name}>
                                  <span
                                    onClick={() => {
                                      if (
                                        !item.subRoutes?.find(
                                          (a) => a.isVisible,
                                        )
                                      ) {
                                        navigate(item.href);
                                      } else {
                                        navigate(item.subRoutes[0].href);
                                        handleOpenDropdown(item);
                                      }
                                    }}
                                    className={classNames(
                                      item.current
                                        ? "bg-red-700 text-white"
                                        : "text-red-200 hover:text-white hover:bg-red-700",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:cursor-pointer",
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current
                                          ? "text-white"
                                          : "text-red-200 group-hover:text-white",
                                        "h-6 w-6 shrink-0",
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </span>
                                  <ul className="pl-6 space-y-1  mt-2">
                                    {window.location.pathname.includes(
                                      item.href,
                                    )
                                      ? item?.subRoutes?.map((subRoute) =>
                                          subRoute.isVisible ? (
                                            <li key={subRoute?.name}>
                                              <span
                                                onClick={() => {
                                                  handleNavigate(subRoute.href);
                                                }}
                                                className={classNames(
                                                  window.location.pathname.includes(
                                                    subRoute.href,
                                                  )
                                                    ? "bg-red-700 text-white"
                                                    : "text-red-200 hover:text-white hover:bg-red-700",
                                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:cursor-pointer",
                                                )}
                                              >
                                                {subRoute?.icon ? (
                                                  <subRoute.icon
                                                    className={classNames(
                                                      window.location.pathname.includes(
                                                        subRoute.href,
                                                      )
                                                        ? "text-white"
                                                        : "text-red-200 group-hover:text-white",
                                                      "h-6 w-6 shrink-0",
                                                    )}
                                                    aria-hidden="true"
                                                  />
                                                ) : null}
                                                {subRoute?.name}
                                              </span>
                                            </li>
                                          ) : null,
                                        )
                                      : null}
                                  </ul>
                                </li>
                              ),
                            )}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-red-600 dark:bg-red-800  px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <h1
                className="text-2xl font-bold cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Paket Mutfak
              </h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navs.map((item) =>
                      !item?.isVisible ? null : (
                        <li key={item.name}>
                          <span
                            onClick={() => {
                              if (!item.subRoutes?.find((a) => a.isVisible)) {
                                navigate(item.href);
                              } else {
                                navigate(item.subRoutes[0].href);
                                handleOpenDropdown(item);
                              }
                            }}
                            className={classNames(
                              item.current
                                ? "bg-red-700 text-white"
                                : "text-red-200 hover:text-white hover:bg-red-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:cursor-pointer",
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-red-200 group-hover:text-white",
                                "h-6 w-6 shrink-0",
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </span>
                          <ul className="pl-6 space-y-1  mt-2">
                            {window.location.pathname.includes(item.href)
                              ? item?.subRoutes?.map((subRoute) =>
                                  subRoute.isVisible ? (
                                    <li key={subRoute?.name}>
                                      <span
                                        onClick={() => {
                                          handleNavigate(subRoute.href);
                                        }}
                                        className={classNames(
                                          window.location.pathname.includes(
                                            subRoute.href,
                                          )
                                            ? "bg-red-700 text-white"
                                            : "text-red-200 hover:text-white hover:bg-red-700",
                                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:cursor-pointer",
                                        )}
                                      >
                                        {subRoute?.icon ? (
                                          <subRoute.icon
                                            className={classNames(
                                              window.location.pathname.includes(
                                                subRoute.href,
                                              )
                                                ? "text-white"
                                                : "text-red-200 group-hover:text-white",
                                              "h-6 w-6 shrink-0",
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : null}
                                        {subRoute?.name}
                                      </span>
                                    </li>
                                  ) : null,
                                )
                              : null}
                          </ul>
                        </li>
                      ),
                    )}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b-[0.5px] dark:border-gray-50 border-gray-300 dark:bg-gray-800 bg-gray-200 border-opacity-60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:text-white text-slate-700">
            <button
              type="button"
              className="-m-2.5 p-2.5 dark:text-white text-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex  justify-end gap-x-4 self-stretch lg:gap-x-6 w-full items-center">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <ActionToggle />
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {auth.user?.photo ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={config.CDN_URL + auth.user?.photo}
                        alt=""
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 rounded-full" />
                    )}
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-2 text-sm font-semibold leading-6 dark:text-white text-slate-700"
                        aria-hidden="true"
                      >
                        {auth.user?.full_name}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-lg dark:bg-gray-800 bg-gray-200  py-2 shadow-lg ring-1 ring-gray-300/5 focus:outline-none">
                      {userNavigation?.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <span
                              onClick={() => handleClick(item.key)}
                              className={classNames(
                                active ? "dark:bg-gray-700 bg-gray-200/50" : "",
                                "block px-3 py-1 text-sm leading-6 dark:text-white text-slate-700 hover:cursor-pointer",
                              )}
                            >
                              {item.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
