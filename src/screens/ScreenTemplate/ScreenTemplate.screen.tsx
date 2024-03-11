import { SafeAreaView, ScrollView } from "react-native";

import styles from "./ScreenTemplate.screen.styles";
import { ScreenTemplateProps as Props } from "./ScreenTemplate.screen.types";

const ScreenTemplate: React.FC<Props> = props => {
  const { scrollable = false, children, style } = props;
  const viewStyle = [styles.container, style];

  let base = (
    <SafeAreaView style={viewStyle}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );

  if (!scrollable)
    base = <SafeAreaView style={viewStyle}>{children}</SafeAreaView>;

  return <>{base}</>;
};

export default ScreenTemplate;
