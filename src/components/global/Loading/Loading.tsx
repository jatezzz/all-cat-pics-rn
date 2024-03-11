import React from "react";
import { ActivityIndicator, View } from "react-native";

import styles from "./Loading.styles";
import { LoadingProps as Props } from "./Loading.types";

import { useThemeColor } from "hooks/useThemeColor";

const Loading: React.FC<Props> = props => {
  const primary = useThemeColor({ colorName: "primary" });
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} color={primary} />
    </View>
  );
};

Loading.defaultProps = {};

export default Loading;
