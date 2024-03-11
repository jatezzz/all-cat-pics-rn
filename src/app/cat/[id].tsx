import DetailScreen from "../../screens/Detail/Detail.screen";
import { Cat } from "../../types/Cat";
import { useLocalSearchParams } from "expo-router";

export const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <DetailScreen cat={new Cat({
      createdAt: "createdAt",
      editedAt: "editedAt",
      mimetype: "mimetype",
      size: 0,
      tags: ["tag1"],
      updatedAt: "updatedAt",
      id: id
    })} />
  );
};

export default Page;
