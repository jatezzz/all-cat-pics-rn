import { useColorScheme } from "react-native";

import Colors from "../styles/Colors";
import { UseThemeColorProps } from "../types/hooks.types";

export const useThemeColor = (props: UseThemeColorProps) => {
  const { colorName } = props;
  const theme = useColorScheme() ?? "light";
  return Colors[theme][colorName];
};
