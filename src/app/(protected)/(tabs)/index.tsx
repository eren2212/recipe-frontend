import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CategorieItem from "@/components/CategorieItem";
import MealItem from "@/components/MealItem";
import { MealData, baseUrl } from "@/../types/Meal";

const imagesPath = [
  require("../../../../assets/images/chicken.png"),
  require("../../../../assets/images/lamb.png"),
  require("../../../../assets/images/pork.png"),
];

export default function Recipe() {
  const [featuredMeal, setfeaturedMeal] = useState<MealData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
  }> | null>(null);

  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const randomMeal = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseUrl}/random.php`);
      setfeaturedMeal(response.data);
      console.log("succes fetch: random meal");
    } catch (err) {
      console.log(err);
      setError("Tarif yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/categories.php`);
      const categoriesData = response.data.categories;
      setCategories(categoriesData);
      
      // 🎯 İlk kategoriyi otomatik seç
      if (categoriesData && categoriesData.length > 0) {
        const firstCategory = categoriesData[0];
        setSelectedCategoryId(firstCategory.idCategory);
        setSelectedCategoryName(firstCategory.strCategory);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    randomMeal();
    getCategories();
  }, []);

  // 🎯 Kategoriler yüklendiğinde ilk kategoriyi seç
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategoryId) {
      const firstCategory = categories[0];
      setSelectedCategoryId(firstCategory.idCategory);
      setSelectedCategoryName(firstCategory.strCategory);
    }
  }, [categories, selectedCategoryId]);

  // Loading durumu
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center">
          <Text className="text-lg">Yükleniyor...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Error durumu
  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center">
          <Text className="text-lg text-red-500">{error}</Text>
          <TouchableOpacity onPress={randomMeal} className="mt-2">
            <Text className="text-sm text-blue-500">Tekrar dene</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Data kontrolü
  if (!featuredMeal || !featuredMeal.meals || !featuredMeal.meals[0]) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center">
          <Text className="text-lg">Tarif bulunamadı</Text>
          <TouchableOpacity onPress={randomMeal} className="mt-2">
            <Text className="text-sm text-blue-500">Tekrar dene</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const { strMealThumb, strArea, strMeal } = featuredMeal.meals[0];

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex justify-center items-center">
            {/* Üst kısım - resimler */}
            <View className="flex flex-row justify-center items-center mt-4">
              {imagesPath.map((path, index) => {
                return (
                  <Image key={index} source={path} className="w-32 h-32" />
                );
              })}
            </View>

            {/* Featured meal card */}
            <View className="w-[350] h-[250] mt-5 relative">
              <Image
                source={{ uri: strMealThumb }}
                className="w-full h-full rounded-2xl opacity-55"
                resizeMode="cover"
              />
              <Text className=" absolute top-5 left-5 text-sm font-medium opacity-80 text-white bg-primary/70 p-3 rounded-2xl">
                Popüler
              </Text>

              <Text className="text-2xl text-white font-bold absolute bottom-14 left-4">
                {strMeal}
              </Text>
              <View className="absolute bottom-4 left-4 justify-center items-center flex-row gap-6">
                <View className="flex-row justify-center items-center ">
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color="white"
                    className="opacity-90"
                  />
                  <Text className="text-white font-semibold ml-2">
                    30 Dakika
                  </Text>
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

                <View className="flex-row justify-center items-center">
                  <EvilIcons name="location" size={24} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    {strArea}
                  </Text>
                </View>
              </View>
            </View>

            {/* Kategoriler - Yatay FlatList */}
            <FlatList
              data={categories}
              horizontal
              className="rounded-2xl m-6"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.idCategory}
              nestedScrollEnabled={true}
              renderItem={({ item }) => {
                const isSelected = item.idCategory === selectedCategoryId;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCategoryId(item.idCategory);
                      setSelectedCategoryName(item.strCategory);
                    }}
                    className="mr-4"
                  >
                    <CategorieItem item={item} selected={isSelected} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Meal Items */}
          <MealItem isSelectedName={selectedCategoryName} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
