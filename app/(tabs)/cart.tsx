import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../store/cartStore";

export default function CartScreen() {
  const cartItems = useCartStore(state => state.cartItems);
  const removeFromCart = useCartStore(state => state.removeOne);
  const getTotalCount =  useCartStore( (state) => state.cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0))


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
         <View style={{display:'flex', flexDirection:"row"}}>
          <Text style={styles.price}>{item.qty} X </Text>
          <Text style={styles.price}>Rs. {item.price}</Text>
        </View>
      </View>
      <View style={{display:'flex',flexDirection:'column'}}>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id) }
        style={styles.removeBtn}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
      <Text style={{fontWeight:'700', marginVertical:5}}> Rs. {item.qty * item.price}</Text>

      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 90 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹{getTotalCount}</Text>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 ,marginTop:50, backgroundColor: "#fff" },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 18, fontWeight: "600" },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F4F6F8",
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { marginTop: 4, color: "#555", fontWeight: "bold" },
  removeBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  removeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  total: { fontSize: 18, fontWeight: "700" },
  checkoutBtn: {
    backgroundColor: "#00A859",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
