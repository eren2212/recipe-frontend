import { Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const imagesPath = [
  require("../../../../assets/images/chicken.png"),
  require("../../../../assets/images/lamb.png"),
  require("../../../../assets/images/pork.png"),
];
export default function Recipe() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-row justify-center items-center mt-4">
        {imagesPath.map((path, index) => {
          return <Image key={index} source={path} className="w-32 h-32" />;
        })}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
