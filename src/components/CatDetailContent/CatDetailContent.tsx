import React, { useState } from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { Cat } from "../../types/Cat";
import TagsView from "./TagsView";
import DetailContent from "./DetailContent";
import DetailImageComponent from "./DetailImageComponent";

// Import your theming system or context if you have one

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
      <DetailImageComponent imageURL={imageURL} onSaveImageToGallery={saveImageToGallery} isSaving={false} />
      <TagsView tags={cat.tags} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInputText}
          onChangeText={(text) => setUserInputText(text.slice(0, characterLimit))}
          placeholder="Add text to image"
        />
        <Button title="Apply" onPress={handleApplyText} />
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
    // Styles for the image container
  },
  catImage: {
    width: "100%",
    height: 400, // Adjust as needed
    borderRadius: 4
  },
  saveButton: {
    position: "absolute",
    right: 10,
    bottom: 20
    // Additional styles for the button
  },
  textInputContainer: {
    flexDirection: "row"
    // Styles for the text input container
  },
  textInput: {
    flex: 1
    // Styles for the text input
  }
  // Define additional styles as needed
});

export default CatDetailContent;
