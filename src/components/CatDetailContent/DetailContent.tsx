import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Cat } from "../../types/Cat";
import { formatDateString } from "../../utils/formatDateString";

// Assume a `theme` and a function `formatDateString(date: Date): string` are defined elsewhere

interface DetailContentProps {
  cat: Cat;
}

const DetailContent: React.FC<DetailContentProps> = ({ cat }) => {

  return (
    <View>
      <Text accessibilityLabel="details">
        Details
      </Text>
      <View style={styles.detailContent}>
        <Text accessibilityLabel={`Detail ID ${cat.id}`} accessibilityHint="detail.id">
          detail.id.{cat.id}
        </Text>
        {cat.createdAt && (
          <Text accessibilityLabel={`Detail created at ${formatDateString(cat.createdAt)}`}>
            detail.createdAt.{formatDateString(cat.createdAt)}
          </Text>
        )}
        {cat.updatedAt && (
          <Text accessibilityLabel={`Detail updated at ${formatDateString(cat.updatedAt)}`}>
            detail.lastUpdateAt.{formatDateString(cat.updatedAt)}
          </Text>
        )}
        {cat.size && (
          <Text accessibilityLabel={`Detail size ${cat.size}`}>
            detail.size.{cat.size}
          </Text>
        )}
        {cat.mimetype && (
          <Text accessibilityLabel={`Detail MIME type ${cat.mimetype}`}>
            detail.mimetype.{cat.mimetype}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContent: {
    alignItems: "flex-start" // Align items to the start, equivalent to SwiftUI's .leading
  }
});

export default DetailContent;
