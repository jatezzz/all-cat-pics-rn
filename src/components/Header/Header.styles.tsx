import { StyleSheet } from "react-native";

import Colors from "../../styles/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    height: 74,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.light.gray,
    borderBottomWidth: 1,
    width: "100%"
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default styles;
