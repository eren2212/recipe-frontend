import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { CardProps } from "types/Meal";
import { COLORS } from "color";

interface ItemCardProps {
  item: CardProps;
}
export default function ItemCard({ item }: ItemCardProps) {
  const router = useRouter();
  const { idMeal, strMeal, strMealThumb, strInstructions } = item;

  return (
    <TouchableOpacity
      className="bg-card rounded-xl shadow-sm border border-gray-200 overflow-hidden mr-2 my-4"
      onPress={() => {
        router.push({ pathname: "/recipe/[id]", params: { idMeal } });
      }}
    >
      <View className="w-52 h-80 flex rounded-xl overflow-hidden">
        <Image
          source={{ uri: strMealThumb }}
          className="w-full h-1/2 rounded-t-xl"
          resizeMode="cover"
        />

        <View className="p-3 flex-1">
          <Text
            className="text-text font-bold text-md mb-2"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {strMeal}
          </Text>

          {strInstructions && (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-textLight text-xs mb-3 flex-1"
            >
              {strInstructions}
            </Text>
          )}

          <View className="flex-row justify-between items-center mt-auto">
            <View className="flex-row items-center">
              <Ionicons
                name="time-outline"
                size={16}
                color={COLORS.textLight}
              />
              <Text className=" text-md ml-1 text-textLight">30 dk</Text>
            </View>

            <View className="flex-row items-center">
              <Feather name="users" size={16} color={COLORS.textLight} />
              <Text className=" text-md ml-1 text-textLight">4</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
