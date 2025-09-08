import { View, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { supabase } from "@/lib/supabase";
export default function Search() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text className="text-3xl text-red-800">Search</Text>

        <Text onPress={() => supabase.auth.signOut()}>
          <MaterialIcons name="logout" size={40} color="black" />
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
