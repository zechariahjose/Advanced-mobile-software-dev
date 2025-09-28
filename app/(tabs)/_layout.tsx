import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../../store';

const DrawerNavigator = createDrawerNavigator();
export const Drawer = withLayoutContext(DrawerNavigator.Navigator);

export default function MainLayout() {
  return (
    <Provider store={store}>
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
        <Drawer.Screen name="index" options={{ title: 'Home' }} />
        <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
        <Drawer.Screen name="playlists" options={{ title: 'Your Playlists' }} />
        <Drawer.Screen name="camera" options={{ title: 'Camera' }} />
        <Drawer.Screen name="theme-settings" options={{ title: 'Theme Settings' }} />
        <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      </Drawer>
    </Provider>
  );
}
