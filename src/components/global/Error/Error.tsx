import React from "react";
import { Text, View } from "react-native";

import styles from "./Error.styles";
import { ErrorProps as Props } from "./Error.types";

const Error: React.FC<Props> = props => {
  const { message = "Error", style } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{message}</Text>
    </View>
  );
};

Error.defaultProps = {};

export default Error;
