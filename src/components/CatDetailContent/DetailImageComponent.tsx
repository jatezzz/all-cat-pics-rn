import React from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface DetailImageComponentProps {
  imageURL: string;
  isSaving: boolean;
  onSaveImageToGallery: () => void;
  onSuccess?: () => void;
  onFailure?: () => void;
}

const DetailImageComponent: React.FC<DetailImageComponentProps> = ({
                                                                     imageURL,
                                                                     isSaving,
                                                                     onSaveImageToGallery,
                                                                     onSuccess,
                                                                     onFailure
                                                                   }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageURL }}
        style={styles.image}
        onLoad={onSuccess}
        onError={onFailure}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel="Image view"
      />
      <TouchableOpacity
        style={[styles.downloadButton, isSaving && styles.downloadButtonDisabled]}
        onPress={onSaveImageToGallery}
        disabled={isSaving}
        accessibilityLabel="Download image"
        accessibilityHint="Downloads the image to your gallery"
        accessibilityRole="button"
      >
        {!isSaving ? (
          <MaterialIcons name="file-download" size={24} color="white" />
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 400
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4
  },
  downloadButton: {
    position: "absolute",
    right: 10,
    bottom: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF", // Replace with your theme accent color
    borderRadius: 25
  },
  downloadButtonDisabled: {
    backgroundColor: "#ccc"
  }
});

export default DetailImageComponent;
