import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}




// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }






// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { withLayoutContext } from 'expo-router';


// const { Navigator } = createDrawerNavigator();
// export const Drawer = withLayoutContext(Navigator);

// export default function DrawerLayout() {
//   return (
//     <Drawer
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: '#1DB954',
//         drawerInactiveTintColor: '#fff',
//         drawerStyle: { backgroundColor: '#121212' },
//         headerStyle: { backgroundColor: '#121212' },
//         headerTintColor: '#fff',
//       }}
//     >
//       <Drawer.Screen name="index" options={{ title: 'Home' }} />
//       <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
//       <Drawer.Screen name="playlists" options={{ title: 'Your Playlists' }} />
//       <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
//     </Drawer>
//   );
// }