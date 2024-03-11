import styles from "./Detail.screen.styles";
import { DetailProps as Props } from "./Detail.screen.types";
import ScreenTemplate from "../ScreenTemplate/ScreenTemplate.screen";
import { Text } from "react-native";
import CatDetailContent from "../../components/CatDetailContent/CatDetailContent";
import CatAPIEndpoints from "../../services/cats/CatAPIEndpoints";
import { useCats } from "../../hooks/CatContext";
import { useEffect, useState } from "react";
import { Cat } from "../../types/Cat";

const DetailScreen: React.FC<Props> = ({ catId }) => {
  const { repository } = useCats();

  const [cat, setCat] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCatDetail = async () => {
      setIsLoading(true);
      try {
        const fetchedCat = await repository.getDetail(catId);
        setCat(fetchedCat);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatDetail();
  }, [catId, repository]);

  if (isLoading) return <Text>Loading...</Text>;
  if (!cat) return <Text>No cat found.</Text>;

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
