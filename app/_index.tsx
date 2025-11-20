// app/_index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function IndexGate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        // User is logged in, go to home
        router.replace("/index");
      } else {
        // User is not logged in, go to login
        router.replace("/auth/spotify");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // On error, default to login screen
      router.replace("/auth/spotify");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return null; // shows nothing while redirecting
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
