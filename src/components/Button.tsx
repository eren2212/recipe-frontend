import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  loadingText?: string;
  disabled?: false;
};
export default function Button({
  title,
  onPress,
  loading = false,
  loadingText,
  disabled = false,
}: ButtonProps) {
  const isDisabled = loading || disabled;
  return (
    <TouchableOpacity
      className={`bg-primary rounded-2xl py-4 mt-6 ${isDisabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={loading}
    >
      <Text className="text-white text-center font-semibold text-lg">
        {loading ? loadingText || "Yükleniyor" : title}
      </Text>
    </TouchableOpacity>
  );
}
