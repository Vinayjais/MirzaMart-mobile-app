import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useUserStore } from "../store/useUserStore";

// Resolve API base URL in a way that works for simulators/emulators and devices.
// Priority:
// 1. `app.json` extra.apiUrl (useful for explicit LAN IP or ngrok)
// 2. Android emulator special host (10.0.2.2)
// 3. Fallback to localhost (works on iOS simulator / when running on the same host)
const getApiBaseUrl = () => {
  const extraUrl = Constants?.expoConfig?.extra?.apiUrl;
  if (extraUrl) return extraUrl;

  if (Platform.OS === "android") {
    // Android emulator (Android Studio AVD)
    return "http://10.0.2.2:5001";
  }

  // iOS simulator or web or running on host machine
  return "http://172.20.10.2:5001";
};

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helpful debug: print resolved base URL so you can see what the app is using in Expo Go / simulators
try {
  // eslint-disable-next-line no-console
  console.log("[axios] baseURL =", axiosInstance.defaults.baseURL);
} catch (e) {
  /* ignore */
}

/* ===================== REQUEST ===================== */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== RESPONSE ===================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.log("API Error:", error.response.status, error.response.data);

      if (error.response.status === 401) {
        // TODO: refresh token or logout
      }
    } else if (error.request) {
      console.log("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
