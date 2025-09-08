import { Text, View, Image, TouchableOpacity } from "react-native";

interface CategoryItemType {
  strCategory: string;
  strCategoryThumb: string;
}

export default function CategorieItem({ item }: { item: CategoryItemType }) {
  const { strCategory, strCategoryThumb } = item;

  return (
    <TouchableOpacity>
      <View className="h-24 w-24 border rounded-2xl  border-border flex justify-center items-center bg-card">
        <Image
          source={{ uri: strCategoryThumb }}
          className="rounded-full w-12 h-12"
        />
        <Text className="text-text font-bold">{strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
}
