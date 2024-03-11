import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export interface TagsViewProps {
  tags: string[];
}

const TagsView: React.FC<TagsViewProps> = ({ tags }) => {
  // Define colors in RGB format to use in React Native
  const colors = ["#FF0000", "#008000", "#0000FF", "#FFA500", "#FFC0CB", "#800080", "#FFFF00"];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.container}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: colors[index % colors.length] }]}>
            <Text style={styles.text} accessibilityLabel={`${tag} tag`}>{tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0 // Prevent ScrollView from filling all available space
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8 // Add some vertical padding to the container
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 15, // Approximates a capsule shape
    marginRight: 10 // Space between tags
  },
  text: {
    color: "white" // Inverted text color for better contrast
  }
});

export default TagsView;
