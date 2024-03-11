import styles from "./Detail.screen.styles";
import { DetailProps as Props } from "./Detail.screen.types";
import ScreenTemplate from "../ScreenTemplate/ScreenTemplate.screen";
import { Text } from "react-native";
import CatDetailContent from "../../components/CatDetailContent/CatDetailContent";
import CatAPIEndpoints from "../../services/cats/CatAPIEndpoints";

const DetailScreen: React.FC<Props> = ({ cat }) => {

  return (
    <ScreenTemplate scrollable style={styles.container}>
      <Text>Now on Detail</Text>
      <CatDetailContent cat={cat} applyTextToImage={text => {
      }} imageURL={CatAPIEndpoints.catImageURL(cat.id)} isSaving={false} onSuccess={() => {
      }} saveImageToGallery={() => {
      }} />
    </ScreenTemplate>
  );
};

export default DetailScreen;
