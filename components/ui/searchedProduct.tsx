import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Product = {
  id: number;
  name: string;
  price: string | number;
  img?: any;
};

type Props = {
  products?: Product[];
  onAdd?: (p: Product) => void;
  onSelect?: (p: Product) => void;
  placeholder?: string;
  loading?: boolean;
};

export default function SearchedProduct({
  products = [],
  onAdd,
  onSelect,
  placeholder = 'Search products',
  onQueryChange,
  loading = false,
}: Props & { onQueryChange?: (q: string) => void }) {
  const [query, setQuery] = useState('');

  // If onQueryChange is provided we assume server-side search and use the
  // `products` prop as the authoritative list. Otherwise perform client-side filter.
  const filtered = useMemo(() => {
    if (typeof onQueryChange === 'function') return products;
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query, products, onQueryChange]);

  // call external query handler when user types
  const handleChange = (text: string) => {
    setQuery(text);
    if (onQueryChange) onQueryChange(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder={placeholder}
          value={query}
          onChangeText={handleChange}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#32B768" />
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptySubtitle}>Try a different search term or clear filters.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.list}
          renderItem={({item}) => (
            <View style={styles.cardWrap}>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => onSelect && onSelect(item)}>
                {item.img ? (
                  <Image source={item.img} style={styles.img} />
                ) : (
                  <View style={styles.imgPlaceholder} />
                )}
                <Text style={styles.name} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buy}
                onPress={() => onAdd && onAdd(item)}>
                <Text style={styles.buyText}>Quick Buy</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12,backgroundColor: '#e6e6e6ff', },
  searchRow: { marginVertical: 8 },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  list: { paddingBottom: 30 },
  column: { justifyContent: 'space-between', marginBottom: 12 },
  cardWrap: { flex: 1, marginHorizontal: 6 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  img: { width: 72, height: 72, marginBottom: 8 },
  imgPlaceholder: { width: 72, height: 72, marginBottom: 8, backgroundColor: '#eee' },
  name: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  price: { fontSize: 14, color: '#32B768', marginVertical: 6 },
  buy: {
    marginTop: 8,
    backgroundColor: '#32B768',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyText: { color: '#fff', fontWeight: '700' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 6 },
  emptySubtitle: { fontSize: 13, color: '#666' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
