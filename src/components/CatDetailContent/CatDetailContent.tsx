import React, { useState } from "react";
import { Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Cat } from "../../types/Cat";
import TagsView from "./TagsView";

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
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageURL }} style={styles.catImage} />
        <TouchableOpacity style={styles.saveButton} onPress={saveImageToGallery} disabled={isSaving}>
          {/* Replace with your save icon */}
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <TagsView tags={cat.tags} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInputText}
          onChangeText={(text) => setUserInputText(text.slice(0, characterLimit))}
          placeholder="Add text to image"
          // Additional TextInput configurations
        />
        <Button title="Apply" onPress={handleApplyText} />
      </View>
      {/* Render additional cat details similarly */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles for the container
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
