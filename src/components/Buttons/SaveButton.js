import { Button } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

const SaveButton = ({ disabled }) => {
  const { t } = useTranslation();
  return (
    <Button
      loading={disabled}
      color="yellow"
      radius={"md"}
      type="submit"
      disabled={disabled}
      className="rounded-md dark:bg-red-700 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm dark:hover:bg-red-600 hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
    >
      {t("actions.save")}
    </Button>
  );
};

export default SaveButton;
