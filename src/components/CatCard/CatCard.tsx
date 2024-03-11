import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CatCardProps as Props } from "./CatCard.types";


const CatCard: React.FC<Props> = props => {
  // Assuming `cat` object has `id`, `displayName`, and other properties as needed
  const imageUrl = `https://cataas.com/cat/${props.cat.id}`;

  return (
    <View style={styles.card}>
      <Image
        style={{ aspectRatio: 1, borderRadius: 10 }}
        source={{
          uri: imageUrl
        }}
        contentFit={"fill"}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{props.cat.displayName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden", // Ensures the image corner radius is clipped
    aspectRatio: 1
  },
  overlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    padding: 5
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
});

export default CatCard;
