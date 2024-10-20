import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { JsDrawer } from '../presentation/templates/js-drawer';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import HeaderLayout from '@/presentation/organisms/HeaderLayout';
import { useTheme } from '@/domain/usecases/hooks/themes/useTheme';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedText } from '@/presentation/atoms/ThemedText';


export default function Layout() {
  const myTheme = useTheme()
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={myTheme}>
      <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 2 }}>
        <JsDrawer
          screenOptions={{
            header: (props) => <HeaderLayout {...props} />,
            drawerPosition: 'left',
          }}
        >
          <JsDrawer.Screen
            name="index"
            options={{
              drawerLabel: () => <ThemedText>Home</ThemedText>,
            }}
          />
          <JsDrawer.Screen
            name="setting"
            options={{
              drawerLabel: () => <ThemedText>Setting</ThemedText>,
            }}
          />
        </JsDrawer>
      </GestureHandlerRootView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});
