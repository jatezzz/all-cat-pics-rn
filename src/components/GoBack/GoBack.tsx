import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./GoBack.styles";
import { GoBackProps as Props } from "./GoBack.types";

import ChevronSVG from "assets/icons/chevron-left.svg";

const GoBack: React.FC<Props> = props => {
  const { style } = props;
  const { back } = router;

  return (
    <TouchableOpacity
      onPress={back}
      hitSlop={styles.hitSlop}
      style={[styles.container, style]}
    >
      <ChevronSVG width={20} height={20} />
    </TouchableOpacity>
  );
};

export default GoBack;
