import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export interface TagsViewProps {
  tags: string[];
}

const TagsView: React.FC<TagsViewProps> = ({ tags }) => {
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
    flexGrow: 0
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10
  },
  text: {
    color: "white"
  }
});

export default TagsView;
