import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function ProfileScreen() {
  const user = {
    name: "Vinay Jaiswal",
    phone: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/300",
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* User Card */}
      <View style={styles.userCard}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox label="Orders" value="12" />
        <StatBox label="Cart" value="3" />
        <StatBox label="Wishlist" value="5" />
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <ProfileItem title="My Orders" onPress={() => {}} />
        <ProfileItem title="Saved Addresses" onPress={() => {}} />
        <ProfileItem title="Payment Methods" onPress={() => {}} />
        <ProfileItem title="Notifications" onPress={() => {}} />
        <ProfileItem title="Help & Support" onPress={() => {}} />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------- Small Components ---------- */

const StatBox = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProfileItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
    marginTop:50
  },

  header: {
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F1F1F",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F1F1F",
  },

  phone: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  editBtn: {
    backgroundColor: "#FF865E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  editText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 10,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F1F1F",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  itemText: {
    fontSize: 14,
    color: "#1F1F1F",
  },

  arrow: {
    fontSize: 18,
    color: "#999",
  },

  logoutBtn: {
    marginHorizontal: 16,
    marginBottom: 30,
    backgroundColor: "#1F1F1F",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
