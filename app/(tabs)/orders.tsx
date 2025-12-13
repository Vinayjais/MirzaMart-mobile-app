import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

const ORDERS = [
  {
    id: "101",
    date: "12 Sep 2025",
    total: 340,
    status: "Delivered",
    items: 3,
  },
  {
    id: "102",
    date: "15 Sep 2025",
    total: 120,
    status: "On the way",
    items: 1,
  },
];

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredOrders =
    activeTab === "All"
      ? ORDERS
      : ORDERS.filter((o) =>
          activeTab === "Ongoing"
            ? o.status !== "Delivered"
            : o.status === "Delivered"
        );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Orders</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["All", "Ongoing", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard order={item} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No orders found</Text>
        }
      />
    </View>
  );
}

const OrderCard = ({ order }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => router.push(`/orders/${order.id}`)}
  >
    <View style={styles.row}>
      <Text style={styles.orderId}>Order #{order.id}</Text>
      <Text
        style={[
          styles.status,
          order.status === "Delivered"
            ? styles.delivered
            : styles.ongoing,
        ]}
      >
        {order.status}
      </Text>
    </View>

    <Text style={styles.date}>{order.date}</Text>

    <View style={styles.row}>
      <Text style={styles.items}>{order.items} items</Text>
      <Text style={styles.total}>₹{order.total}</Text>
    </View>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
    paddingHorizontal:16,
    marginTop:50
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 12,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
    marginHorizontal: 4,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#FF865E",
  },

  tabText: {
    fontSize: 13,
    color: "#333",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 14,
    fontWeight: "600",
  },

  status: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  delivered: {
    backgroundColor: "#E8F8F1",
    color: "#2E8B57",
  },

  ongoing: {
    backgroundColor: "#FFF2E8",
    color: "#FF865E",
  },

  date: {
    fontSize: 12,
    color: "#777",
    marginVertical: 6,
  },

  items: {
    fontSize: 13,
    color: "#555",
  },

  total: {
    fontSize: 15,
    fontWeight: "600",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
