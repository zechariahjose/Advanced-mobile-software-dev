import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
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
          <Drawer.Screen 
            name="index" 
            options={{ 
              title: 'Home'
            }} 
          />
          <Drawer.Screen 
            name="profile" 
            options={{ 
              title: 'Profile'
            }} 
          />
          <Drawer.Screen 
            name="playlists" 
            options={{ 
              title: 'Your Playlists'
            }} 
          />
          <Drawer.Screen 
            name="camera" 
            options={{ 
              title: 'Camera'
            }} 
          />
          <Drawer.Screen 
            name="map" 
            options={{ 
              title: 'Live Map'
            }} 
          />
          <Drawer.Screen 
            name="theme-settings" 
            options={{ 
              title: 'Theme Settings'
            }} 
          />
          <Drawer.Screen 
            name="settings" 
            options={{ 
              title: 'Settings'
            }} 
          />
        </Drawer>
      </ThemeProvider>
    </Provider>
  );
}
