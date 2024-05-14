import { ActionIcon, Group } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ActionToggle = ({ children, ...props }) => {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);
  const toggleDarkMode = () => {
    setTheme(colorTheme);
  };
  return (
    <Group justify="center">
      <ActionIcon
        classNames={{
          root:
            theme === "dark"
              ? " !bg-gray-800 !border-none"
              : " !bg-gray-200 !border-none",
        }}
        onClick={() => toggleDarkMode()}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {theme === "dark" ? (
          <IconSun className={theme === "dark" && "text-white"} stroke={1.5} />
        ) : (
          <IconMoon stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
};

export default ActionToggle;
