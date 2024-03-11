import React from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useGetCats } from "../../services/cats/cats.service.types";
import Loading from "../../components/global/Loading/Loading";
import Error from "../../components/global/Error/Error";

const errorMessage = "Ocurrió un problema, vuelve a intentarlo";

const ListScreen: React.FC<Props> = () => {
  const { isLoading, cats, error } = useGetCats();


  if (isLoading) return <Loading />;
  if (error) return <Error message={errorMessage} />;

  return (
    <>
      <Text>Hola mundo Cat</Text>

      <FlatList
        data={cats}
        renderItem={({ item }) =>
          <Link href={`/cat/`} asChild>
            <TouchableOpacity>
              <View>
                <Text>{item.id}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        }
        keyExtractor={item => item.id}
        indicatorStyle="black"
      />
    </>
  );
};

export default ListScreen;
