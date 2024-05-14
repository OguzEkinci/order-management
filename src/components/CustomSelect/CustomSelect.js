import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const CustomSelect = ({
  control,
  name,
  error,
  data,
  onChange,
  withoutController,
  value,
  searchable,
  disabled,
  defaultValue,
  limit = 100,
  ...props
}) => {
  const { t } = useTranslation();
  if (withoutController)
    return (
      <Select
        defaultValue={value}
        searchable={searchable}
        disabled={disabled}
        onBlur={() => {}}
        limit={limit}
        nothingFoundMessage={t("actions.nothing-found")}
        classNames={{
          input: `dark:!bg-gray-800 !bg-gray-300/100 dark:!text-white !text-slate-700 !ring-1 !border-none !rounded-md ring-inset dark:!placeholder-white/30 !placeholder-slate-700 ring-white/5 ! focus:!ring-2 focus:!ring-inset focus:!ring-red-500 sm:!text-sm sm:!leading-6 !w-full ${
            error ? "!ring-red-500 dark:!ring-red-500" : ""
          }`,
          wrapper:
            "dark:!bg-gray-800 !bg-gray-300/100 rounded-md dark:!text-white !text-slate-700",
          dropdown:
            "dark:!bg-gray-800 !bg-gray-300/100 dark:!text-white !text-slate-700 !border-none !rounded-md ring-inset !ring-white/5 focus:!ring-2 focus:!ring-inset focus:!ring-red-500 sm:text-sm sm:leading-6",
          option: "hover:dark:bg-gray-700 hover:bg-gray-200/50",
        }}
        onChange={onChange}
        value={value}
        data={data}
        {...props}
      />
    );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: hookOnChange, onBlur, value } }) => {
        return (
          <Select
            limit={limit}
            searchable={searchable}
            classNames={{
              input: `dark:!bg-gray-800 !bg-gray-300/100 dark:!text-white !text-slate-700 !ring-1 !border-none !rounded-md ring-inset dark:!placeholder-white/30 !placeholder-slate-700 ring-white/5 ! focus:!ring-2 focus:!ring-inset focus:!ring-red-500 sm:text-sm sm:leading-6 !w-full ${
                error ? "!ring-red-500 dark:!ring-red-500" : ""
              }`,
              wrapper:
                "dark:!bg-gray-800 !bg-gray-300/100 rounded-md dark:!text-white !text-slate-700",
              dropdown:
                "dark:!bg-gray-800 !bg-gray-300/100 dark:!text-white !text-slate-700 !border-none !rounded-md ring-inset !ring-white/5 focus:!ring-2 focus:!ring-inset focus:!ring-red-500 sm:text-sm sm:leading-6",
              option: "hover:dark:bg-gray-700 hover:bg-gray-200/50",
            }}
            onChange={onChange ? onChange : hookOnChange} // send value to hook form
            onBlur={onBlur}
            value={value}
            data={data}
            {...props}
          />
        );
      }}
    />
  );
};

export default CustomSelect;
