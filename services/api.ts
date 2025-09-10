import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "recipe-backend-production-c349.up.railway.app/api/favorites",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("supabase_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
