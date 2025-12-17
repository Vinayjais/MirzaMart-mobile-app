import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account ✨</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

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

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/Authentications/login")}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  