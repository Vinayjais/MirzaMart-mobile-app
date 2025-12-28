import { showRNFlash } from '@/components/ui/rn-flash';
import React, { useMemo } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from "../store/cartStore";

export default function CartScreen() {
  const cartItems = useCartStore((state: any) => state.cartItems);
  const addToCart = useCartStore((state: any) => state.addToCart);
  const removeOne = useCartStore((state: any) => state.removeOne);
  const removeItem = useCartStore((state: any) => (state as any).removeItem);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => sum + (Number(item.price) * (item.qty || 1)), 0);
  }, [cartItems]);


  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Image source={ item.image ? { uri: item.image } : require('../../assets/products/milk.png') } style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

        <View style={styles.rowBetween}>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              onPress={() => removeOne(item.id)}
              style={styles.qtyBtn}
              accessibilityLabel={`Decrease quantity of ${item.name}`}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyCount}>{item.qty}</Text>

            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={styles.qtyBtn}
              accessibilityLabel={`Increase quantity of ${item.name}`}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemSubtotal}>₹{Number(item.price) * item.qty}</Text>
        </View>
      </View>

      <View style={{display:'flex',flexDirection:'column'}}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Remove item', `Remove ${item.name} from cart?`, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Remove', style: 'destructive', onPress: () => {
                  removeItem(item.id);
                  showRNFlash({ message: 'Item removed', description: item.name, type: 'info' });
                } }
            ]);
          }}
          style={styles.removeBtn}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 140 }}
          />

          <SafeAreaView edges={["bottom"]} style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.total}>₹{subtotal}</Text>
            </View>

            <TouchableOpacity style={[styles.checkoutBtn, subtotal === 0 && { opacity: 0.5 }]} disabled={subtotal === 0}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 ,marginTop:50, backgroundColor: "#fff" },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 18, fontWeight: "600" },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  qtyText: { fontSize: 18, fontWeight: '700' },
  qtyCount: { marginHorizontal: 10, fontSize: 16, fontWeight: '600' },
  itemSubtotal: { fontSize: 14, fontWeight: '700' },
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
  totalLabel: { color: '#666', fontSize: 12, marginBottom: 4 },
  total: { fontSize: 18, fontWeight: "700" },
  checkoutBtn: {
    backgroundColor: "#00A859",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
