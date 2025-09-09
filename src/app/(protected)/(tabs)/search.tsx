import { COLORS } from "color";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView className="mt-6 ">
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
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
