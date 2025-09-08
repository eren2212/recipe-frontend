import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { baseUrl, CardProps } from "types/Meal";
import ItemCard from "./ItemCard";

type selectedItemName = string | null;

export default function MealItem({
  isSelectedName,
}: {
  isSelectedName: selectedItemName;
}) {
  const [categoryMeals, setCategoryMeals] = useState<CardProps[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  // ✅ DOĞRU - useEffect en üstte
  useEffect(() => {
    mealToCategory();
  }, [isSelectedName]);

  const mealToCategory = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${baseUrl}/filter.php?c=${isSelectedName}`
      );
      setCategoryMeals(response.data.meals || []);
      console.log(response.data.meals);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  // ✅ DOĞRU - Conditional return hook'lardan sonra
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="ml-8">
      <Text className="text-text text-2xl font-bold">{isSelectedName}</Text>

      <FlatList
        data={categoryMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <ItemCard item={item} />}
      />
    </View>
  );
}
