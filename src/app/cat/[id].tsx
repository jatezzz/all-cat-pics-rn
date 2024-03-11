import DetailScreen from "../../screens/Detail/Detail.screen";
import { useLocalSearchParams } from "expo-router";

export const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <DetailScreen catId={id} />
  );
};

export default Page;
