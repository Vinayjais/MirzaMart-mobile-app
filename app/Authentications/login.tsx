import { showRNFlash } from '@/components/ui/rn-flash';
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useUserStore } from '../store/useUserStore';
import { loginUser } from './Api';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((s) => s.setUser);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.primaryBtn, loading ? { opacity: 0.7 } : null]}
        onPress={async () => {
          if (!email || !password) {
            showRNFlash({ message: 'Please enter email and password', type: 'warning' });
            return;
          }

          setLoading(true);
          try {
            const res = await loginUser({ email: email.trim(), password: password.trim() });
            const data = res?.data;
            if (res?.status && res.status >= 200 && res.status < 300) {
              // Expecting token and user in response.data
              const token = data?.token ?? data?.authToken ?? null;
              const user = data?.user ?? data?.data ?? null;
              if (token && user) {
                setUser(user, token);
                showRNFlash({ message: data?.message ?? 'Login successful', type: 'success' });
                router.replace('/');
              } else {
                showRNFlash({ message: data?.message ?? 'Login successful', description: 'But missing token/user in response', type: 'info' });
                router.replace('/');
              }
            } else {
              showRNFlash({ message: data?.message ?? 'Login failed', type: 'danger' });
            }
          } catch (err) {
            console.log('login error', err);
            const msg = (err as any)?.message ?? String(err);
            showRNFlash({ message: 'Network error', description: msg, type: 'danger' });
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      >
        <Text style={styles.primaryText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Authentications/register")}>
        <Text style={styles.link}>
          Don’t have an account? <Text style={styles.linkBold}>Register</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F6F7",
      padding: 24,
    },
  
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: "#1F1F1F",
      marginTop: 40,
    },
  
    subtitle: {
      fontSize: 14,
      color: "#777",
      marginBottom: 30,
      marginTop: 6,
    },
  
    input: {
      backgroundColor: "#fff",
      padding: 14,
      borderRadius: 14,
      fontSize: 14,
      marginBottom: 14,
    },
  
    forgot: {
      alignItems: "flex-end",
      marginBottom: 24,
    },
  
    forgotText: {
      fontSize: 12,
      color: "#FF865E",
      fontWeight: "600",
    },
  
    primaryBtn: {
      backgroundColor: "#FF865E",
      padding: 16,
      borderRadius: 14,
      alignItems: "center",
      marginBottom: 16,
    },
  
    primaryText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },
  
    link: {
      textAlign: "center",
      fontSize: 13,
      color: "#777",
    },
  
    linkBold: {
      color: "#FF865E",
      fontWeight: "700",
    },
  });
  