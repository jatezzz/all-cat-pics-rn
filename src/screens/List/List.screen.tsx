import React, { useEffect, useState } from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Error from "../../components/global/Error/Error";
import CatCard from "../../components/CatCard/CatCard";
import { Cat } from "../../types/Cat";
import { useCats } from "../../services/cats/context/useCats";
import ScreenTemplate from "../../screens/ScreenTemplate/ScreenTemplate.screen";

const errorMessage = "Ocurrió un problema, vuelve a intentarlo";
const numColumns = 2;
const horizontalSpacing = 10;
const verticalSpacing = 10;
const { width } = Dimensions.get("window");
const itemWidth = (width - (numColumns + 1) * horizontalSpacing) / numColumns;

const ListScreen: React.FC<Props> = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState(null);

  const { repository } = useCats();
  const fetchCats = async () => {
    try {
      const newCats = await repository?.getList(currentPage) ?? [];
      setCats((prevCats) => [...prevCats, ...newCats]);
    } catch (err) {
      console.log("err", err);
      // @ts-ignore
      setError(err);
    }
  };
  const loadNextPage = async () => {
    setIsLoading(true);
    await fetchCats();
    setCurrentPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await loadNextPage();
    })();
  }, [repository]);

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
    <ScreenTemplate style={styles.container}>
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
    </ScreenTemplate>
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
