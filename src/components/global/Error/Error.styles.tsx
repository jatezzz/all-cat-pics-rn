import { StyleSheet } from "react-native";

import Colors from "styles/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: Colors.light.danger,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center"
  }
});

export default styles;
