// Interfaces and types from component ScreenTemplate

import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

// Component Props
export interface ScreenTemplateProps {
  scrollable?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
