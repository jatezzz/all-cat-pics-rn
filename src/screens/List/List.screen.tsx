import React from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useGetCats } from "../../services/cats/cats.service.types";
import Error from "../../components/global/Error/Error";
import CatCard from "../../components/CatCard/CatCard";
import { Cat } from "../../types/Cat";

const errorMessage = "Ocurrió un problema, vuelve a intentarlo";
const numColumns = 2;
const horizontalSpacing = 10;
const verticalSpacing = 10;
const { width } = Dimensions.get("window");
const itemWidth = (width - (numColumns + 1) * horizontalSpacing) / numColumns;

const ListScreen: React.FC<Props> = () => {
  const { isLoading, cats, error, loadNextPage } = useGetCats();
  const columnWidth = (Dimensions.get("window").width / 2) - 15; // Calculate based on your needs

  if (error) return <Error message={errorMessage} />;

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>My List Header</Text>
    </View>
  );

  const ItemSeparator = () => <View style={{ height: verticalSpacing }} />;

  const renderCatCard = ({ item }: { item: Cat }) => (

    <Link href={`/cat/${item.id}`} asChild>
      <TouchableOpacity
        accessibilityLabel={`List cat name ${item.displayName}`}
        accessibilityHint="Double tap to view cat details"
        accessibilityRole="button"
        style={{ width: columnWidth }}
      >
        <CatCard cat={item} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text
        accessibilityHint="list.page.description"
      >
        list.pageDescription
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  listContent: {
    paddingHorizontal: horizontalSpacing // Add padding to the sides of the list
  },
  item: {
    backgroundColor: "lightgrey", // Example color
    width: itemWidth,
    height: 200, // Adjust your item height as needed
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalSpacing / 2
  },
  header: {
    padding: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default ListScreen;
