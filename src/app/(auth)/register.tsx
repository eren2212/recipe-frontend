import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BaseImage from "@/components/image/BaseImage";
import Button from "@/components/Button";

const router = useRouter();

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  async function signUpWithEmail() {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        Alert.alert(error.message);
      }
      // Aynı e-posta tekrar kaydedilmeye çalışıldığında identities boş gelir
      else if (data.user?.identities?.length === 0) {
        Alert.alert("Bu e-posta zaten kayıtlı!");
      } else {
        // Kullanıcı yeni oluşturulduysa
        if (!data.session) {
          // E-posta doğrulama gerekiyorsa verification sayfasına yönlendir
          router.push({ pathname: "/verification", params: { email } });
        } else {
          // Eğer confirmation kapalıysa kullanıcı direkt giriş yapar
          // Burada anasayfaya yönlendirebilirsin
          router.push("/(protected)");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 justify-start items-center px-6">
            <BaseImage source={require("../../../assets/images/i2.png")} />
            <Text className="text-3xl font-bold text-text mb-8">
              Hesap Oluşturma
            </Text>

            <View className="w-full space-y-4 gap-5 ">
              <View>
                <TextInput
                  className="border border-border rounded-2xl p-4  text-base bg-gray-50"
                  onChangeText={setEmail}
                  value={email}
                  placeholder=" Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View>
                <TextInput
                  className="border border-border rounded-2xl p-4 text-base bg-gray-50"
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Şifre"
                  secureTextEntry
                />
              </View>

              <Button
                onPress={signUpWithEmail}
                title="Hesap Oluştur"
                loading={loading}
                loadingText="Hesap Oluşturuluyor.."
              />

              <View className="flex justify-center items-center flex-row">
                <Text className="text-textLight">Hesabınız var mı? </Text>
                <Link href="/login" asChild>
                  <Pressable>
                    <Text className="text-primary font-bold">Giriş Yapın</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}
