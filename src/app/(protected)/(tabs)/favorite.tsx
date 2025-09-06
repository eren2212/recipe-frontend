import { Pressable, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { supabase } from "@/lib/supabase";

export default function Recipe() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center bg-background ">
        <Text className="text-3xl text-red-800">Favorite sayfası</Text>
        <Pressable onPress={() => supabase.auth.signOut()}>
          <MaterialIcons name="logout" size={40} color="black" />
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
