import { Text, View, Image } from "react-native";

interface CategoryItemType {
  strCategory: string;
  strCategoryThumb: string;
}

export default function CategorieItem({
  item,
  selected,
}: {
  item: CategoryItemType;
  selected: boolean;
}) {
  const { strCategory, strCategoryThumb } = item;

  return (
    <View
      className={`h-24 w-24 border rounded-3xl  border-border flex justify-center items-center ${selected ? "bg-primary border-none" : "bg-card "}`}
    >
      <Image
        source={{ uri: strCategoryThumb }}
        className={`rounded-full w-12 h-12 ${selected ? "border-2 border-white" : "border-none"}`}
      />
      <Text
        className={` font-bold mt-1 ${selected ? "text-white" : "text-text"}`}
      >
        {strCategory}
      </Text>
    </View>
  );
}
