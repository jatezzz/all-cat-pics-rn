import React from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useGetCats } from "../../services/cats/cats.service.types";
import Loading from "../../components/global/Loading/Loading";
import Error from "../../components/global/Error/Error";
import CatCard from "../../components/CatCard/CatCard";

const errorMessage = "Ocurrió un problema, vuelve a intentarlo";

const ListScreen: React.FC<Props> = () => {
  const { isLoading, cats, error, loadNextPage } = useGetCats();

  if (error) return <Error message={errorMessage} />;

  return (
    <>
      <Text>Hola mundo Cat</Text>

      <FlatList
        data={cats}
        renderItem={({ item }) =>
          <Link href={`/cat/${item.id}`} asChild>
            <TouchableOpacity>
              <CatCard cat={item} />
            </TouchableOpacity>
          </Link>
        }
        keyExtractor={item => item.id}
        indicatorStyle="black"
        onEndReachedThreshold={0.5} // Fetch when half of the last item is visible
        onEndReached={({ distanceFromEnd }) => {
          if (!isLoading) {
            (async () => {
              await loadNextPage();
            })();
          }
        }}
        ListFooterComponent={<Loading />}
      />
    </>
  );
};

export default ListScreen;
