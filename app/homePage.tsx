import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const playlists = [
  {
    id: '1',
    name: 'Top Hits',
    image: 'https://i.scdn.co/image/ab67616d0000b273b1a1d0f4e8d3f2e3f6b64f1d',
  },
  {
    id: '2',
    name: 'Chill Vibes',
    image: 'https://i.scdn.co/image/ab67616d0000b2730f528bbfc5a5d1f99afed4d6',
  },
  {
    id: '3',
    name: 'Workout Mix',
    image: 'https://i.scdn.co/image/ab67616d0000b273ed8e47c0d01abf4b0c4b11d3',
  },
  {
    id: '4',
    name: 'Acoustic',
    image: 'https://i.scdn.co/image/ab67616d0000b2732d0c2b087bf02f2d07a4f98a',
  },
];

export const options = {
  headerShown: false,
};

export default function HomePage() {
  const renderPlaylist = ({ item }) => (
    <TouchableOpacity style={styles.playlistCard}>
      <Image source={{ uri: item.image }} style={styles.playlistImage} />
      <Text style={styles.playlistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Playlists</Text>
      <FlatList
        data={playlists}
        renderItem={renderPlaylist}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  playlistCard: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '48%',
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  playlistName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
