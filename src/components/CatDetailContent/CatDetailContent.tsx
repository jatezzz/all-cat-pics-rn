import React, { useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { Cat } from "../../types/Cat";
import TagsView from "./TagsView";
import DetailContent from "./DetailContent";
import DetailImageComponent from "./DetailImageComponent";
import { t } from "../../localization/localization";

interface CatDetailContentProps {
  cat: Cat;
  imageURL: string;
  isSaving: boolean;
  applyTextToImage: (text: string) => void;
  saveImageToGallery: () => void;
  onSuccess: () => void;
  onFailure?: (error: Error) => void;
}

const CatDetailContent: React.FC<CatDetailContentProps> = ({
                                                             cat,
                                                             imageURL,
                                                             isSaving,
                                                             applyTextToImage,
                                                             saveImageToGallery,
                                                             onSuccess,
                                                             onFailure
                                                           }) => {
  const [userInputText, setUserInputText] = useState<string>("");
  const characterLimit = 40;

  const handleApplyText = () => {
    applyTextToImage(userInputText);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <DetailImageComponent imageURL={imageURL} onSaveImageToGallery={saveImageToGallery} isSaving={isSaving} />
      <Text accessibilityLabel={t("detail.tags")}>
        {t("detail.tags")}
      </Text>
      <TagsView tags={cat.tags} />
      <Text accessibilityLabel={t("detail.makeItYours")}>
        {t("detail.makeItYours")}
      </Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInputText}
          onChangeText={(text) => setUserInputText(text.slice(0, characterLimit))}
          placeholder="Add text to image"
        />
        <Button title="Apply" onPress={handleApplyText} disabled={isSaving} />
      </View>
      <DetailContent cat={cat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  imageContainer: {

  },
  catImage: {
    width: "100%",
    height: 400,
    borderRadius: 4
  },
  saveButton: {
    position: "absolute",
    right: 10,
    bottom: 20
  },
  textInputContainer: {
    flexDirection: "row"
  },
  textInput: {
    flex: 1
  }
});

export default CatDetailContent;
