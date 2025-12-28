import SearchedProduct from '@/components/ui/searchedProduct';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { products as defaultProducts } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { searchProducts } from './Api';
import { View } from 'react-native';

export default function SearchedProductsScreen() {
  const addToCart = useCartStore((s: any) => s.addToCart);
  const router = useRouter();

  // show local/default products immediately while server search loads
  const [results, setResults] = useState<any[]>(defaultProducts ?? []);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await searchProducts(q);
      // handle common response shapes
      const data = res?.data ?? res;
      const list = data?.data ?? data?.results ?? data ?? [];
      setResults(Array.isArray(list) ? list : []);
    } catch (e) {
      console.warn('search error', e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    // doSearch('');
  }, [doSearch]);

  // debounce query changes
  useEffect(() => {
    // const t = setTimeout(() => doSearch(query), 300);
    // return () => clearTimeout(t);
  }, [query, doSearch]);

  return (
    <View style={{ flex: 1 }}>
      <SearchedProduct
        products={results}
        onAdd={(p) => addToCart({ ...p, qty: 1 })}
        onSelect={(p) => router.push({ pathname: '/Products/ProductOverviewScreen', params: { id: p.id } })}
        onQueryChange={setQuery}
        loading={loading}
      />
    </View>
  );
}
