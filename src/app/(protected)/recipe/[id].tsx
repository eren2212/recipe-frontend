import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { baseUrl, Meal } from "types/Meal";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "color";

export default function ItemDetail() {
  const local = useLocalSearchParams();
  const router = useRouter();
  const [mealDetails, setMealDeails] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getmealDeails();
  }, []);

  const getmealDeails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/lookup.php?i=${local.idMeal}`
      );

      if (
        !response.data ||
        !response.data.meals ||
        response.data.meals.length === 0
      ) {
        console.error("id ye ait veri bulunamadi");
        return;
      }

      setMealDeails(response.data.meals[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!mealDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Tarif bulunamadı</Text>
      </View>
    );
  }

  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
  } = mealDetails;

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 ">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Resim ve Butonlar */}
          <View className="relative">
            <Image
              source={{ uri: strMealThumb }}
              className="h-[400] opacity-80"
              resizeMode="cover"
            />

            {/* Butonlar - Resmin üzerinde */}
            <View className="absolute top-4 left-0 right-0 flex-row justify-between items-center px-4">
              <Pressable
                className="p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20"
                onPress={() => router.back()}
              >
                <AntDesign name="arrow-left" size={24} color="white" />
              </Pressable>

              <Pressable className="p-3 rounded-full bg-primary backdrop-blur-sm border border-white/20">
                <Ionicons name="bookmark-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View className="absolute left-5 bottom-16 flex justify-center items-start p-1 gap-1">
              <Text className="text-sm text-white font-medium bg-primary p-3 rounded-full uppercase tracking-wider">
                {strCategory}
              </Text>

              <Text
                className="text-3xl font-bold text-white mb-3"
                numberOfLines={2}
              >
                {strMeal}
              </Text>

              <View className="flex flex-row gap-2 justify-center items-center">
                <Octicons name="location" size={20} color={COLORS.white} />
                <Text className="text-white text-xl ">{strArea}</Text>
              </View>
            </View>
          </View>

          {/* İçerik */}
          <View className="flex-1 p-6 -mt-6 bg-background rounded-t-3xl">
            <View className=" flex-row justify-center items-center gap-4">
              <View className="flex-1 justify-center items-center shadow-lg rounded-3xl p-3 h-36 bg-card gap-1">
                <MaterialCommunityIcons
                  name="clock-time-four"
                  size={24}
                  color="white"
                  className="bg-orange-500  p-3 rounded-full"
                />
                <Text className="text-text text-xl">30 minutes</Text>
                <Text className="text-textLight text-sm">Prep Time</Text>
              </View>

              <View className="flex-1 justify-center items-center bg-card  shadow-lg rounded-3xl p-3 h-36 gap-1">
                <Entypo
                  name="users"
                  size={24}
                  color="white"
                  className="bg-green-600 p-3 rounded-full"
                />
                <Text className="text-text text-xl">4</Text>
                <Text className="text-textLight text-sm">Servings</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
