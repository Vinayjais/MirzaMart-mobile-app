import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FlashOptions = {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
};

let showFn: ((opts: FlashOptions) => void) | null = null;

export function showFlash(opts: FlashOptions) {
  if (showFn) showFn(opts);
}

export default function FlashMessage() {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [duration, setDuration] = useState(3000);

  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    showFn = ({message, type = 'info', duration = 3000}) => {
      setMessage(message);
      setType(type);
      setDuration(duration);
      setVisible(true);
    };

    return () => {
      showFn = null;
    };
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        const t = setTimeout(() => {
          hide();
        }, duration);
        return () => clearTimeout(t);
      });
    }
  }, [visible]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -80,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      setMessage('');
    });
  };

  if (!visible) return null;

  const bgColor =
    type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb';

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.container,
        {paddingTop: Math.max(insets.top, 8)},
        {transform: [{translateY}], opacity},
      ]}>
      <TouchableOpacity activeOpacity={0.9} onPress={hide}>
        <View style={[styles.box, {backgroundColor: bgColor}]}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 0,
    zIndex: 9999,
  },
  box: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
