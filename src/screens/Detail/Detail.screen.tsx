import styles from "./Detail.screen.styles";
import { DetailProps as Props } from "./Detail.screen.types";
import ScreenTemplate from "../ScreenTemplate/ScreenTemplate.screen";
import { Text, View } from "react-native";
import CatDetailContent from "../../components/CatDetailContent/CatDetailContent";
import CatAPIEndpoints from "../../config/CatAPIEndpoints";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useCatDetails } from "../../hooks/useCatDetails";
import { t } from "../../localization/localization";
import Error from "../../components/global/Error/Error";

const DetailScreen: React.FC<Props> = ({ catId }) => {
  const { cat, isLoading, error } = useCatDetails(catId);

  const [imageURL, setImageURL] = useState<string>(CatAPIEndpoints.catImageURL(catId));
  const [isSaving, setIsSaving] = useState<boolean>(false);

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


  const downloadAndSaveImage = async (mimeType: string) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const fileExtension = getFileExtension(mimeType);

    try {
      const fileUri = FileSystem.documentDirectory + `temporaryfile${fileExtension}`;
      const { uri } = await FileSystem.downloadAsync(imageURL, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("AllCatPics", asset, false);
      alert("Image saved to gallery!");
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save image");
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (!cat) return <Text>No cat found.</Text>;
  if (error) return <Error message={t("general.error")} />;

  return (
    <ScreenTemplate scrollable style={styles.container}>
      <View style={styles.header}>
        <Text
          style={styles.headerText}
          accessibilityHint={t("detail.page.description")}
        >
          {t("detail.page.description")}
        </Text>
      </View>
      <CatDetailContent cat={cat}
                        applyTextToImage={text => {
                          setImageURL(CatAPIEndpoints.catSaysImageURL(cat?.id ?? "", text));
                        }}
                        imageURL={imageURL}
                        isSaving={isSaving}
                        onSuccess={() => {
                        }}
                        saveImageToGallery={() => {
                          (async () => {
                            setIsSaving(true);
                            await downloadAndSaveImage(cat?.mimetype ?? "");
                            setIsSaving(false);
                          })();

                        }} />
    </ScreenTemplate>
  );
};

export default DetailScreen;
