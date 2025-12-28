// HomeScreen.js

import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories, products } from '../data/products';
import { useCartStore } from "../store/cartStore";

// const categories = [
//   { id: 1, label: "Fruits & Veg", icon: require("../../assets/icons/veg.png") },
//   { id: 2, label: "Dairy", icon: require("../../assets/icons/milk.png") },
//   { id: 3, label: "Snacks", icon: require("../../assets/icons/snacks.jpeg") },
//   { id: 4, label: "Beverages", icon: require("../../assets/icons/drink.png") },
// ];

// const products = [
//   { id: 1, name: "Amul Milk", price: "28", img: require("../../assets/products/milk.png") },
//   { id: 2, name: "Banana", price: "45", img: require("../../assets/products/banana.png") },
//   { id: 3, name: "Amul Milk", price: "28", img: require("../../assets/products/milk.png") },
//   { id: 4, name: "Banana", price: "45", img: require("../../assets/products/banana.png") },
//   { id: 5, name: "Amul Milk", price: "28", img: require("../../assets/products/milk.png") },
//   { id: 6, name: "Banana", price: "45", img: require("../../assets/products/banana.png") },
// ];

export default function HomeScreen() {
  const  addToCart = useCartStore((s) => s.addToCart);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.location}>MirzaMart - Mirzapur ▼</Text>
          <Text style={styles.deliveryTime}>Delivery in 20 mins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profilePic}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>V</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar (tap to open search screen) */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchInput}
          onPress={() => router.push('/Products/SearchedProductsScreen')}
        >
          <Text style={{ color: '#999' }}>Search groceries & essentials</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Category List */}
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> router.push({
              pathname:"/Products/CategoryProductsScreen",
             params:{
              categoryName:item.label
             }
            }) } style={styles.categoryBox}>
              <Image source={item.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        />

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⚡ Upto 50% OFF on Daily Essentials</Text>
        </View>

        {/* Product List */}
        <Text style={styles.sectionTitle}>Quick Buys</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.productCardWrapper}>
              <TouchableOpacity
                style={styles.productCard}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/Products/ProductOverviewScreen',
                    params: { id: item.id },
                  })
                }
              >
                <Image source={item.img} style={styles.productImg} />
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickBuyBtn}
                onPress={() => addToCart({ ...item, qty: 1 })}
              >
                <Text style={styles.quickBuyText}>Quick Buy</Text>
              </TouchableOpacity>
            </View>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F4F4" },
  header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: { fontSize: 16, fontWeight: "bold" },
  deliveryTime: { fontSize: 12, color: "gray" },
  profilePic: {
    backgroundColor: "#D9F2E6",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  searchContainer: { paddingHorizontal: 15 },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },
  categoryBox: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  categoryIcon: { width: 50, height: 50 },
  categoryText: { fontSize: 12, marginTop: 5 },
  banner: {
    backgroundColor: "#32B768",
    padding: 15,
    margin: 15,
    borderRadius: 12,
  },
  bannerText: { color: "white", fontWeight: "bold" },
  sectionTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  productImg: { width: 70, height: 70, marginBottom: 10 },
  productName: { fontSize: 14, fontWeight: "600" },
  productPrice: { fontSize: 14, color: "#32B768", marginVertical: 5 },
  addBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderColor: "#32B768",
    borderWidth: 1,
    borderRadius: 8,
  },
  addText: { color: "#32B768", fontWeight: "bold" },
  productsList: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productCardWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },
  quickBuyBtn: {
    marginTop: 8,
    backgroundColor: '#32B768',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickBuyText: { color: '#fff', fontWeight: '700' },
});
