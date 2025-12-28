import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCartStore } from "../store/cartStore";
  
  const PRODUCT = {
    id: 1,
    name: "Fresh Red Apples",
    price: 120,
    mrp: 150,
    unit: "1 kg",
    image: "https://via.placeholder.com/400",
    description:
      "Fresh and juicy red apples sourced directly from farms. Rich in fiber and antioxidants.",
  };
  
  export default function ProductOverviewScreen() {
    const { id } = useLocalSearchParams();
  const addToCart = useCartStore((s: any) => s.addToCart);
  const removeOne = useCartStore((s: any) => s.removeOne);
  const cartItems = useCartStore((s: any) => s.cartItems);
  const productQty = cartItems.find((x: any) => x.id === PRODUCT.id)?.qty || 0;
    const [liked, setLiked] = useState(false);
  
  const cartItem = cartItems.find((x: any) => x.id === PRODUCT.id);
  
    return (
      <View style={styles.container}>
        {/* Header */}
    
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image */}
          <View style={styles.imageWrap}>
            <Image source={{ uri: PRODUCT.image }} style={styles.image} />

            <TouchableOpacity
              accessibilityLabel={liked ? 'Unlove product' : 'Love product'}
              onPress={() => setLiked(!liked)}
              style={[styles.heartBtn, liked && styles.heartBtnActive]}
            >
              <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={22} color={liked ? '#fff' : '#FF3B30'} />
            </TouchableOpacity>
          </View>
  
          {/* Info */}
          <View style={styles.info}>
            <Text style={styles.name}>{PRODUCT.name}</Text>
            <Text style={styles.unit}>{PRODUCT.unit}</Text>
  
            {/* Price */}
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{PRODUCT.price}</Text>
              <Text style={styles.mrp}>₹{PRODUCT.mrp}</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {Math.round(
                    ((PRODUCT.mrp - PRODUCT.price) / PRODUCT.mrp) * 100
                  )}
                  % OFF
                </Text>
              </View>
            </View>
  
            {/* Add to Cart */}
            {!cartItem ? (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addToCart(PRODUCT)}
              >
                <Text style={styles.addText}>ADD TO CART</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => removeOne(PRODUCT.id)}
                  accessibilityLabel={`Decrease quantity of ${PRODUCT.name}`}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{cartItem.qty}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => addToCart(PRODUCT)}
                  accessibilityLabel={`Increase quantity of ${PRODUCT.name}`}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
  
            {/* Delivery */}
            <View style={styles.deliveryBox}>
              <Text style={styles.deliveryTitle}>🚚 Delivery</Text>
              <Text style={styles.deliveryText}>
                Delivery in 10–15 minutes
              </Text>
            </View>
  
            {/* Description */}
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.description}>{PRODUCT.description}</Text>
          </View>
        </ScrollView>
  
        {/* Sticky Footer */}
        {productQty > 0 && (
          <TouchableOpacity style={styles.cartBar} onPress={() => router.push('/cart')}>
            <Text style={styles.cartText}>
              View Cart • {productQty} items
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F6F7",
    },
  
    header: {
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor: "#fff",
      elevation: 3,
    },
  
    back: {
      fontSize: 22,
      marginRight: 12,
    },
  
    title: {
      fontSize: 18,
      fontWeight: "600",
    },
  
    image: {
      width: "100%",
      height: 280,
      backgroundColor: "#eee",
    },
    imageWrap: {
      position: 'relative',
      backgroundColor: '#fff'
    },
    heartBtn: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: 'rgba(255,255,255,0.95)',
      padding: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#FFE6E0',
    },
    heartBtnActive: {
      backgroundColor: '#FF3B30',
      borderColor: '#FF3B30',
    },
  
    info: {
      backgroundColor: "#fff",
      padding: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -24,
    },
  
    name: {
      fontSize: 20,
      fontWeight: "600",
      color: "#1F1F1F",
    },
  
    unit: {
      fontSize: 13,
      color: "#777",
      marginVertical: 4,
    },
  
    priceRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 12,
    },
  
    price: {
      fontSize: 22,
      fontWeight: "700",
      color: "#1F1F1F",
      marginRight: 8,
    },
  
    mrp: {
      fontSize: 14,
      textDecorationLine: "line-through",
      color: "#999",
      marginRight: 8,
    },
  
    discountBadge: {
      backgroundColor: "#E8F8F1",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
  
    discountText: {
      color: "#2E8B57",
      fontSize: 12,
      fontWeight: "600",
    },
  
    addBtn: {
      backgroundColor: "#FF865E",
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      marginVertical: 10,
    },
  
    addText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
  
    qtyRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
  
    qtyBtn: {
      backgroundColor: "#FF865E",
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
  
    qtyText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },
  
    qty: {
      marginHorizontal: 16,
      fontSize: 16,
      fontWeight: "600",
    },
  
    deliveryBox: {
      backgroundColor: "#F5F6F7",
      padding: 12,
      borderRadius: 12,
      marginTop: 14,
    },
  
    deliveryTitle: {
      fontSize: 14,
      fontWeight: "600",
    },
  
    deliveryText: {
      fontSize: 13,
      color: "#555",
      marginTop: 4,
    },
  
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 20,
    },
  
    description: {
      fontSize: 14,
      color: "#555",
      marginTop: 6,
      lineHeight: 20,
    },
  
    cartBar: {
      backgroundColor: "#1F1F1F",
      padding: 16,
      alignItems: "center",
    },
  
    cartText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
  });
  