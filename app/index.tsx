import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ThemeState } from '../store/themeSlice';

// Spotify-style data
const recentlyPlayed = [
  {
    id: '1',
    title: 'Liked Songs',
    subtitle: '1,234 songs',
    image: 'https://i.scdn.co/image/ab67616d0000b273b1a1d0f4e8d3f2e3f6b64f1d',
    type: 'playlist'
  },
  {
    id: '2',
    title: 'Daily Mix 1',
    subtitle: 'Made for you',
    image: 'https://i.scdn.co/image/ab67616d0000b2730f528bbfc5a5d1f99afed4d6',
    type: 'playlist'
  },
  {
    id: '3',
    title: 'Discover Weekly',
    subtitle: 'Your weekly mixtape of fresh music',
    image: 'https://i.scdn.co/image/ab67616d0000b273ed8e47c0d01abf4b0c4b11d3',
    type: 'playlist'
  },
  {
    id: '4',
    title: 'Release Radar',
    subtitle: 'Catch all the latest music from artists you follow',
    image: 'https://i.scdn.co/image/ab67616d0000b2732d0c2b087bf02f2d07a4f98a',
    type: 'playlist'
  },
];

const madeForYou = [
  {
    id: '5',
    title: 'Top Hits',
    subtitle: 'The biggest songs right now',
    image: 'https://i.scdn.co/image/ab67616d0000b273b1a1d0f4e8d3f2e3f6b64f1d',
    type: 'playlist'
  },
  {
    id: '6',
    title: 'Chill Vibes',
    subtitle: 'Relaxing music for any time',
    image: 'https://i.scdn.co/image/ab67616d0000b2730f528bbfc5a5d1f99afed4d6',
    type: 'playlist'
  },
  {
    id: '7',
    title: 'Workout Mix',
    subtitle: 'High-energy tracks to keep you moving',
    image: 'https://i.scdn.co/image/ab67616d0000b273ed8e47c0d01abf4b0c4b11d3',
    type: 'playlist'
  },
  {
    id: '8',
    title: 'Acoustic',
    subtitle: 'Unplugged and intimate',
    image: 'https://i.scdn.co/image/ab67616d0000b2732d0c2b087bf02f2d07a4f98a',
    type: 'playlist'
  },
];

const quickAccess = [
  { id: '1', title: 'Made for you', icon: '🎵' },
  { id: '2', title: 'Recently played', icon: '🕒' },
  { id: '3', title: 'Liked songs', icon: '❤️' },
  { id: '4', title: 'Albums', icon: '💿' },
  { id: '5', title: 'Artists', icon: '👤' },
  { id: '6', title: 'Podcasts', icon: '🎙️' },
];

export const options = {
  headerShown: false,
};

interface PlaylistItem {
  id: string;
  name: string;
  image: string;
}

export default function HomePage() {
  const { theme } = useTheme() as { theme: ThemeState };

  const getDynamicStyles = () => {
    if (theme.mode === 'light') {
      return {
        container: { backgroundColor: '#ffffff' },
        text: { color: '#000000' },
        secondaryText: { color: '#666666' },
        card: { backgroundColor: '#f5f5f5' },
        sectionTitle: { color: '#000000' },
      };
    } else if (theme.mode === 'custom') {
      return {
        container: { backgroundColor: theme.customBackground },
        text: { color: theme.customText },
        secondaryText: { color: theme.customText + '80' },
        card: { backgroundColor: theme.customBackground === '#ffffff' ? '#f5f5f5' : '#1E1E1E' },
        sectionTitle: { color: theme.customText },
      };
    } else {
      return {
        container: { backgroundColor: '#121212' },
        text: { color: '#ffffff' },
        secondaryText: { color: '#b3b3b3' },
        card: { backgroundColor: '#282828' },
        sectionTitle: { color: '#ffffff' },
      };
    }
  };

  const dynamicStyles = getDynamicStyles();

  const renderQuickAccess = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.quickAccessItem, dynamicStyles.card]}>
      <Text style={styles.quickAccessIcon}>{item.icon}</Text>
      <Text style={[styles.quickAccessText, dynamicStyles.text]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderPlaylist = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.playlistItem}>
      <Image source={{ uri: item.image }} style={styles.playlistImage} />
      <View style={styles.playlistInfo}>
        <Text style={[styles.playlistTitle, dynamicStyles.text]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.playlistSubtitle, dynamicStyles.secondaryText]} numberOfLines={1}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, dynamicStyles.text]}>Good afternoon</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Image source={{ uri: 'https://via.placeholder.com/30x30/1DB954/FFFFFF?text=U' }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Quick access</Text>
        <FlatList
          data={quickAccess}
          renderItem={renderQuickAccess}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.quickAccessGrid}
        />
      </View>

      {/* Recently Played */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Recently played</Text>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderPlaylist}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Made for You */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Made for you</Text>
        <FlatList
          data={madeForYou}
          renderItem={renderPlaylist}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  quickAccessGrid: {
    paddingHorizontal: 20,
  },
  quickAccessItem: {
    flex: 1,
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  quickAccessIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 8,
    marginRight: 15,
    padding: 12,
    width: 200,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  playlistSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
});
