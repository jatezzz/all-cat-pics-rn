import React from "react";
import { ListScreenProps as Props } from "./List.screen.types";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

const ListScreen: React.FC<Props> = () => {
  return (
    <>
      <Text>Hola mundo</Text>
      <Link href={`/cat`} asChild>
        <TouchableOpacity>
          <View>
            <Text>Test the cat</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default ListScreen;
