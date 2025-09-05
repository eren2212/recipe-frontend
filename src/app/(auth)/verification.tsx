import BaseImage from "@/components/image/BaseImage";
import { supabase } from "@/lib/supabase";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "react-native";
import Button from "@/components/Button";

const router = useRouter();

export default function Verification() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!email) {
      Alert.alert("Hata", "Email bilgisi bulunamadı", [
        { text: "Tamam", onPress: () => router.back() },
      ]);
    }
  }, [email]);

  async function verifyOTP() {
    setLoading(true);
    if (!email) {
      Alert.alert("Hata", "Email bilgisi eksik");
    }

    if (!code || code.length !== 6) {
      Alert.alert("Hata", "Lütfen 6 haneli doğrulama kodunu giriniz!!");
    }
    const { data: verifyData, error: verifyError } =
      await supabase.auth.verifyOtp({
        email: email,
        token: code, // kullanıcıdan aldığın 6 haneli kod
        type: "email", // email OTP doğrulaması
      });

    if (verifyError) {
      Alert.alert("OTP doğrulama hatası", "Lütfen doğru kodu giriniz!");
    } else {
      setLoading(false);
      Alert.alert(
        "Başarılı",
        "Email adresininiz doğrulandı .Giriş yapabilirsiniz",
        [{ text: "Tamam", onPress: () => router.replace("/login") }]
      );
    }
  }

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="bg-background flex-1">
          <View className="flex justify-center items-center">
            <BaseImage source={require("../../../assets/images/i3.png")} />
            <Text className="text-text font-medium">
              E-Postanızı Doğrulayın
            </Text>
            <Text className="text-textLight font-medium">
              {email} hesabınıza kod gönderdik.
            </Text>
          </View>

          <View className="w-full space-y-4 flex justify-center items-center mt-8">
            <TextInput
              className="border-border border py-5  text-text text-2xl rounded-2xl w-[370] bg-card text-center tracking-widest"
              value={code}
              onChangeText={setCode}
              placeholder="Kodunuzu giriniz."
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <View className=" p-5">
            <Button
              onPress={verifyOTP}
              title="Emailinizi Doğrulayın"
              loading={loading}
              loadingText="Doğrulanıyor.."
            />
            <Button
              onPress={() => router.back()}
              title="Hesap Oluşturma Sayfasına Dön"
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}
