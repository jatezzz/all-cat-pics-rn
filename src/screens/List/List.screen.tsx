import React from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Error from "../../components/global/Error/Error";
import CatCard from "../../components/CatCard/CatCard";
import { Cat } from "../../types/Cat";
import ScreenTemplate from "../../screens/ScreenTemplate/ScreenTemplate.screen";
import { useCatList } from "../../hooks/useCatList";
import { t } from "./../../localization/localization";

const numColumns = 2;
const horizontalSpacing = 10;
const verticalSpacing = 10;
const { width } = Dimensions.get("window");
const itemWidth = (width - (numColumns + 1) * horizontalSpacing) / numColumns;

const ListScreen: React.FC<Props> = () => {
  const { cats, isLoading, error, loadNextPage } = useCatList();

  const columnWidth = (Dimensions.get("window").width / 2) - 15; // Calculate based on your needs

  if (error) return <Error message={t("general.error")} />;

  const renderHeader = () => (
    <View style={styles.header}>
      <Text
        style={styles.headerText}
        accessibilityHint={t("list.page.description")}
      >
        {t("list.pageDescription")}
      </Text>
    </View>
  );

  const ItemSeparator = () => <View style={{ height: verticalSpacing }} />;

  const renderCatCard = ({ item }: { item: Cat }) => (

    <Link href={`/cat/${item.id}`} asChild>
      <TouchableOpacity
        accessibilityLabel={`List cat name ${item.displayName}`}
        accessibilityHint={t("list.cat.name.accessibilityHint")}
        accessibilityRole="button"
        style={{ width: columnWidth }}
      >
        <CatCard cat={item} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScreenTemplate style={styles.container}>
      <FlatList
        data={cats}
        renderItem={renderCatCard}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        indicatorStyle="black"
        onEndReachedThreshold={0.5}
        onEndReached={({ distanceFromEnd }) => {
          if (!isLoading) {
            (async () => {
              await loadNextPage();
            })();
          }
        }}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
      />
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  listContent: {
    paddingHorizontal: horizontalSpacing
  },
  item: {
    backgroundColor: "lightgrey",
    width: itemWidth,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalSpacing / 2
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20
  },
  headerText: {
    fontSize: 14
  }
});

export default ListScreen;
