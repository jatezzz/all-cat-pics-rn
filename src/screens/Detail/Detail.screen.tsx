import styles from "./Detail.screen.styles";
import { DetailProps as Props } from "./Detail.screen.types";
import ScreenTemplate from "../ScreenTemplate/ScreenTemplate.screen";
import { Text } from "react-native";
import CatDetailContent from "../../components/CatDetailContent/CatDetailContent";
import CatAPIEndpoints from "../../services/cats/CatAPIEndpoints";
import { useCats } from "../../hooks/CatContext";
import { useEffect, useState } from "react";
import { Cat } from "../../types/Cat";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

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

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return false;
    }
    return true;
  };
  const getFileExtension = (mimeType: string): string => {
    const mimeToExt: { [key: string]: string } = {
      "image/jpeg": ".jpg",
      "image/png": ".png"
    };

    return mimeToExt[mimeType] || ".jpg";
  };


  const downloadAndSaveImage = async (imageUrl: string, mimeType: string) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const fileExtension = getFileExtension(mimeType);

    try {
      // Adjust the file URI to include the correct file extension
      const fileUri = FileSystem.documentDirectory + `temporaryfile${fileExtension}`;

      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      // Now uri has the correct file extension, proceed to save
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("YourAppName", asset, false);
      alert("Image saved to gallery!");
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save image");
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (!cat) return <Text>No cat found.</Text>;

  return (
    <ScreenTemplate scrollable style={styles.container}>
      <Text>Now on Detail</Text>
      <CatDetailContent cat={cat} applyTextToImage={text => {
      }} imageURL={CatAPIEndpoints.catImageURL(cat.id)} isSaving={false} onSuccess={() => {
      }} saveImageToGallery={() => {
        (async () => {
          await downloadAndSaveImage(CatAPIEndpoints.catImageURL(cat.id), cat?.mimetype ?? "");
        })();

      }} />
    </ScreenTemplate>
  );
};

export default DetailScreen;
