import React, { useState } from "react";
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
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 justify-start items-center px-6">
            <BaseImage source={require("../../../assets/images/i1.png")} />
            <Text className="text-3xl font-bold text-text mb-8">
              Tekrar Hoş Geldiniz
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
                onPress={signInWithEmail}
                title="Giriş Yap"
                loading={loading}
                loadingText="Giriş Yapılıyor.."
              />

              <View className="flex justify-center items-center flex-row">
                <Text className="text-textLight">Hesabınız yok mu? </Text>
                <Link href="/register" asChild>
                  <Pressable>
                    <Text className="text-primary font-bold">
                      Hesap Oluştur
                    </Text>
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
