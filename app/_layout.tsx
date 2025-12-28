import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import FlashMessage from '@/components/ui/flash-message';
import { useColorScheme } from '@/hooks/use-color-scheme';
import RNFlashMessage from 'react-native-flash-message';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
  <FlashMessage />
  <RNFlashMessage position="top" />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
