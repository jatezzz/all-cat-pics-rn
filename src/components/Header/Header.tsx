import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import styles from "./Header.styles";
import { HeaderProps as Props } from "./Header.types";
import GoBack from "../GoBack/GoBack";


const Header: React.FC<Props> = props => {
  const { showGoBack } = props;

  return (
    <SafeAreaView style={styles.container}>
      {showGoBack ? <GoBack /> : null}
      <View style={styles.logo}>
        <Text style={{ fontWeight: "bold" }}>AllCatPics</Text>
      </View>
    </SafeAreaView>
  );
};

Header.defaultProps = {};

export default Header;
