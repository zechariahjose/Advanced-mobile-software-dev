import { useColorScheme } from '@/hooks/useColorScheme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const DrawerNavigator = createDrawerNavigator();
export const Drawer = withLayoutContext(DrawerNavigator.Navigator);

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: '#1DB954',
          drawerInactiveTintColor: '#fff',
          drawerStyle: { backgroundColor: '#121212' },
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen name="homePage" options={{ title: 'Home' }} />
        <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
        <Drawer.Screen name="playlists" options={{ title: 'Your Playlists' }} />
        <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      </Drawer>
    </ThemeProvider>
  );
}
