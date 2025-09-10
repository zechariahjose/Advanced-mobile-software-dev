import { StyleSheet, Text, View } from 'react-native';

export default function Playlists() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is your Playlists page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  text: { color: '#fff', fontSize: 20 },
});
