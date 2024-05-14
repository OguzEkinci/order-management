import { Fragment, forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  BookmarkSquareIcon,
  BuildingStorefrontIcon,
  ClipboardIcon,
  PlusCircleIcon,
  TagIcon,
  Square3Stack3DIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconAnchor } from "@tabler/icons-react";
import { IconBuildingWarehouse } from "@tabler/icons-react";
import { useStore } from "../../hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const routes = [
  {
    name: "user-create",
    path: "/user/create",
    icon: UserPlusIcon,
  },
  {
    name: "company-create",
    path: "/company/create",
    icon: IconAnchor,
  },
  {
    name: "product-create",
    path: "/product/create",
    icon: ArchiveBoxIcon,
  },
  {
    name: "product-brandcreate",
    path: "/product/brand/create",
    icon: BookmarkSquareIcon,
  },
  {
    name: "product-cardtypecreate",
    path: "/product/card-type/create",
    icon: ClipboardIcon,
  },
  {
    name: "product-categorycreate",
    path: "/product/category/create",
    icon: TagIcon,
  },
  {
    name: "product-subcategorycreate",
    path: "/product/sub-category/create",
    icon: TagIcon,
  },
  {
    name: "sales-mainsalesareacreate",
    path: "/sales/main-sales-area/create",
    icon: Square3Stack3DIcon,
  },
  {
    name: "sales-subsalesareacreate",
    path: "/sales/sub-sales-area/create",
    icon: Square3Stack3DIcon,
  },
  {
    name: "storage-create",
    path: "/storage/create",
    icon: IconBuildingWarehouse,
  },
  {
    name: "showcase-create",
    path: "/showcase/create",
    icon: BuildingStorefrontIcon,
  },
];

const PlusButtonForCreate = forwardRef((props, ref) => {
  const { auth } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Menu ref={ref} as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-700 px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">
          <PlusCircleIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            {routes.map((item, i) => {
              return (
                <Menu.Item key={`${i.toString()}${item.name}`}>
                  {({ active }) => (
                    <span
                      onClick={() => {
                        navigate(item.path);
                      }}
                      className={classNames(
                        active
                          ? "bg-red-500 dark:bg-red-600 dark:text-white text-gray-50"
                          : "text-gray-500 dark:text-white",
                        "group flex items-center first-of-type:rounded-t-lg last-of-type:rounded-b-lg cursor-pointer px-4 py-2 text-xs",
                      )}
                    >
                      <item.icon
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-50 dark:group-hover:text-gray-300 dark:text-white"
                        aria-hidden="true"
                      />
                      {t(`navigationItems.${item.name}`)}
                    </span>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});

export default PlusButtonForCreate;
