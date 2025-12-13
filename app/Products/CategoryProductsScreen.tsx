import React,{useState, useMemo} from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { useCartStore } from "../store/cartStore";
import { useLocalSearchParams, router } from "expo-router";

const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 120,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Organic Bananas",
    price: 60,
    image: "https://via.placeholder.com/150",
  },
];

export default function CategoryProductsScreen({ route, navigation }) {
    const { categoryName } = useLocalSearchParams();
    const addToCart = useCartStore((s) => s.addToCart);
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
        if (!search.trim()) return PRODUCTS;
        return PRODUCTS.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }, [search]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>₹{item.price}</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
       {/* 🔍 Search Bar */}
       <View style={styles.searchBox}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
      {/* Products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F6F7",
    },
  
 
  

    card: {
      width: "48%",
      backgroundColor: "#fff",
      borderRadius: 14,
      padding: 12,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
    },
  
    image: {
      width: "100%",
      height: 120,
      borderRadius: 12,
      marginBottom: 8,
    },
  
    name: {
      fontSize: 14,
      color: "#1F1F1F",
      marginBottom: 6,
    },
  
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    price: {
      fontSize: 15,
      fontWeight: "600",
    },
  
    addBtn: {
      backgroundColor: "#FF865E",
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
    },
  
    addText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },
    searchBox: {
        padding: 12,
        backgroundColor: "#F5F6F7",
      },
      
      searchInput: {
        height: 42,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      },
      
      emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#777",
        fontSize: 14,
      },
      
  });
  