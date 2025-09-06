import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Recipe() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text className="text-3xl text-red-800">TArif SAyfası</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
