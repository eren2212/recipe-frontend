import { COLORS } from "color";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
// import { useDebounce } from "react-use"; // Removed due to nano-css conflict
import axios from "axios";
import { baseUrl, CardProps } from "types/Meal";

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMeals, setSearhMeals] = useState<CardProps[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMeal();
    }
  }, [debouncedSearchTerm]);

  const searchMeal = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/search.php?s=${debouncedSearchTerm}`
      );
      if (response.data.meals) {
        setSearhMeals(response.data.meals);
      } else {
        setSearhMeals([]);
      }
    } catch (err) {
      console.log(err);
      setSearhMeals([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView>
            <View className="flex-1 justify-center items-center mx-7 ">
              <View className="w-full h-16 justify-start  items-center flex-row  border  border-border rounded-3xl bg-card">
                <Feather
                  name="search"
                  size={24}
                  color={COLORS.textLight}
                  className="mx-3"
                />
                <TextInput
                  placeholder="Search recipes, ingredients..."
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="default"
                  autoCapitalize="none"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  className=" w-[550]"
                />
              </View>
            </View>
            {searchTerm && (
              <Text className="ml-auto mr-10 mt-5 text-textLight font-bold">
                {searchMeals.length} adet bulundu
              </Text>
            )}

            {searchMeals.length == 0 && (
              <View className="flex justify-center items-center mt-48">
                <Text className="text-textLight text-2xl font-bold ">
                  {" "}
                  Lütfen Arama Yapın
                </Text>
              </View>
            )}
            {searchMeals.length > 0 && (
              <View className="mt-6">
                <FlatList
                  data={searchMeals}
                  keyExtractor={(item) => item.idMeal}
                  renderItem={({ item }) => <ItemCard item={item} />}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-evenly" }}
                  scrollEnabled={false}
                />
              </View>
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaProvider>
  );
}
