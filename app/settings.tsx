import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive", 
          onPress: async () => {
            await AsyncStorage.removeItem("isLoggedIn");
            router.replace('/auth/spotify');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Email</Text>
        <Text style={styles.settingValue}>user@email.com</Text>
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Username</Text>
        <Text style={styles.settingValue}>mySpotifyUser</Text>
      </View>

      {/* Preferences Section */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#1DB954" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: "#767577", true: "#1DB954" }}
          thumbColor={notifications ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* App Section */}
      <Text style={styles.sectionTitle}>App</Text>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingLabel}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingLabel}>Help</Text>
      </TouchableOpacity>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  sectionTitle: {
    color: '#b3b3b3',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
  },
  settingValue: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
