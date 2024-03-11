import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import styles from "./Header.styles";
import { HeaderProps as Props } from "./Header.types";
import GoBack from "../GoBack/GoBack";
import { useLocalSearchParams } from "expo-router";
import { generateName } from "../../utils/generateName";

const Header: React.FC<Props> = props => {
  const { showGoBack } = props;
  const { id } = useLocalSearchParams<{ id: string | null }>();
  return (
    <SafeAreaView style={styles.container}>
      {showGoBack ? <GoBack /> : null}
      <View style={styles.header}>
        <Text style={styles.headerText}>{id ? generateName(id) : "AllCatPics"}</Text>
      </View>
    </SafeAreaView>
  );
};

Header.defaultProps = {};

export default Header;
