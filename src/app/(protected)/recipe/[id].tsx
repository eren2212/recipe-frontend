import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ItemDetail() {
  const local = useLocalSearchParams();

  return (
    <View>
      <Text className="text-3xl text-red-500">{local.idMeal}</Text>
    </View>
  );
}
