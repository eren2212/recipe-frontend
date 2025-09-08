import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { CardProps } from "types/Meal";

interface ItemCardProps {
  item: CardProps;
}
export default function ItemCard({ item }: ItemCardProps) {
  const router = useRouter();

  const { idMeal, strMeal, strMealThumb, strInstructions } = item;
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: "/recipe/[id]", params: { idMeal } });
      }}
    >
      <View className="w-80 h-96 flex ">
        <Image source={{ uri: strMealThumb }} className="w-full h-1/2" />
        <Text className="text-text">{strMeal}</Text>
        {strInstructions && (
          <View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-textLight"
            >
              {strInstructions}
            </Text>
          </View>
        )}

        <View className="flex-row justify-center items-center ">
          <Ionicons
            name="time-outline"
            size={20}
            color="white"
            className="opacity-90"
          />
          <Text className="text-white font-semibold ml-2">30 Dakika</Text>
        </View>

        <View className="flex-row justify-center items-center">
          <Feather
            name="users"
            size={18}
            color="white"
            className="opacity-90"
          />
          <Text className="text-white font-semibold ml-2">4</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
