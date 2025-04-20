"use client";

import { rem, Switch, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { type FC } from "react";

import { useTheme } from "@/contexts/theme";

const ThemeSwitch: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const themeForColor = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(12), height: rem(12) }}
      stroke={2.5}
      color={themeForColor.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(12), height: rem(12) }}
      stroke={2.5}
      color={themeForColor.colors.blue[6]}
    />
  );

  return (
    <Switch
      checked={theme !== "light"}
      onClick={toggleTheme}
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};

export default ThemeSwitch;
