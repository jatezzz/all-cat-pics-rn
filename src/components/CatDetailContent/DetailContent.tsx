import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Cat } from "../../types/Cat";
import { formatDateString } from "../../utils/formatDateString";
import { t } from "../../localization/localization";

interface DetailContentProps {
  cat: Cat;
}

const DetailContent: React.FC<DetailContentProps> = ({ cat }) => {

  return (
    <View>
      <Text accessibilityLabel="details">
        {t("details")}
      </Text>
      <View style={styles.detailContent}>
        <Text accessibilityLabel={`Detail ID ${cat.id}`} accessibilityHint="detail.id">
          {t("detail.id.%@", cat.id)}
        </Text>
        {cat.createdAt && (
          <Text accessibilityLabel={`Detail created at ${formatDateString(cat.createdAt)}`}>
            {t("detail.createdAt.%@", formatDateString(cat.createdAt))}
          </Text>
        )}
        {cat.updatedAt && (
          <Text accessibilityLabel={`Detail updated at ${formatDateString(cat.updatedAt)}`}>
            detail.lastUpdateAt.{formatDateString(cat.updatedAt)}
          </Text>
        )}
        {cat.size && (
          <Text accessibilityLabel=
                  {t("detail.size.accessibilityLabel.%@", String(cat.size))}>
            {t("detail.size.%@", String(cat.size))}
          </Text>
        )}
        {cat.mimetype && (
          <Text accessibilityLabel={t("detail.mimetype.accessibilityLabel.%@", String(cat.mimetype))}>
            {t("detail.mimetype.%@", String(cat.mimetype))}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContent: {
    alignItems: "flex-start"
  }
});

export default DetailContent;
