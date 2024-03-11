import styles from "./Detail.screen.styles";
import { ProductDetailProps as Props } from "./Detail.screen.types";
import ScreenTemplate from "@screens/ScreenTemplate/ScreenTemplate.screen";
import { Text } from "react-native";

const DetailScreen: React.FC<Props> = () => {

  return (
    <ScreenTemplate scrollable style={styles.container}>
      <Text>Now on Detail</Text>
    </ScreenTemplate>
  );
};

export default DetailScreen;
