import React, { useState } from "react";
import { Link } from "expo-router";
import { Alert, View, Text, TextInput, Pressable } from "react-native";
import { supabase } from "@/lib/supabase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BaseImage from "@/components/image/BaseImage";
import Button from "@/components/Button";

export default async function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
    },
  });
  if (error) {
    console.log("OTP gönderme hatası:", error);
  } else {
    console.log("OTP e-posta olarak gönderildi!");
  }

  return (
    <SafeAreaProvider>
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
                placeholder=" Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <TextInput
                className="border border-border rounded-2xl p-4 text-base bg-gray-50"
                onChangeText={setPassword}
                value={password}
                placeholder="Enter password"
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
    </SafeAreaProvider>
  );
}
