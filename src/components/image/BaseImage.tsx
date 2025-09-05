import { Image, ImageSourcePropType } from "react-native";

type BaseImageProps = {
  source: ImageSourcePropType | string;
};

export default function BaseImage({ source }: BaseImageProps) {
  // Eğer string ise (URL), uri olarak kullan
  // Eğer require() ile gelen local asset ise, direkt kullan
  const imageSource = typeof source === "string" ? { uri: source } : source;

  return <Image source={imageSource} className="w-[400] h-[400]" />;
}
