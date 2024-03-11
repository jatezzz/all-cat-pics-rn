import React from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useGetCats } from "../../services/cats/cats.service.types";
import Error from "../../components/global/Error/Error";
import CatCard from "../../components/CatCard/CatCard";
import { Cat } from "../../types/Cat";

const errorMessage = "Ocurrió un problema, vuelve a intentarlo";

const ListScreen: React.FC<Props> = () => {
  const { isLoading, cats, error, loadNextPage } = useGetCats();
  const columnWidth = (Dimensions.get("window").width / 2) - 15; // Calculate based on your needs

  if (error) return <Error message={errorMessage} />;


  const renderCatCard = ({ item }: { item: Cat }) => (

    <Link href={`/cat/${item.id}`} asChild>
      <TouchableOpacity
        accessibilityLabel={`List cat name ${item.displayName}`} // Modify as per your accessibilityLabel
        accessibilityHint="Double tap to view cat details" // Modify as per your accessibilityHint
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
        numColumns={2} // For grid layout
        indicatorStyle="black"
        onEndReachedThreshold={0.5} // Fetch when half of the last item is visible
        onEndReached={({ distanceFromEnd }) => {
          if (!isLoading) {
            (async () => {
              await loadNextPage();
            })();
          }
        }}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        contentContainerStyle={styles.listContent}
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
    paddingHorizontal: 10
  }
  // Add more styles as needed
});

export default ListScreen;
