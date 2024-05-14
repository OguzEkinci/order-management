import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconSearch } from "@tabler/icons-react";
import { CloseIcon } from "@mantine/core";

const CustomSearch = ({ search, onSearch, textInputClassName }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(search);
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    setSearchQuery("");
    onSearch("");
  };
  return (
    <div className="flex justify-between items-center ml-auto xs:w-full">
      <div className="relative flex items-center p-1 xs:w-full">
        <input
          type="text"
          placeholder={t("placeholders.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`border border-gray-300 dark:bg-slate-600
          md:text-[16px] text-[14px] ${textInputClassName}
                     rounded-md py-1 px-3 pr-10 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:text-red-500::placeholder
                     dark:focus:ring-red-800 dark:focus:border-red-800 dark:focus:text-red-800::placeholder dark:focus-white dark:text-white`}
        />
        <div className="flex absolute right-3 top-2 bottom-2 text-white rounded-md py-1">
          {searchQuery ? (
            <CloseIcon onClick={handleClear} size={20} color="yellow" />
          ) : (
            <IconSearch size={20} color="gray" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSearch;
