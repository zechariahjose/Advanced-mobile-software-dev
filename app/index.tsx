import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ThemeState } from '../store/themeSlice';


const recentlyPlayed = [
  {
    id: '1',
    title: 'Liked Songs',
    subtitle: '1,234 songs',
    image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
    type: 'playlist'
  },
  {
    id: '2',
    title: 'Midnights',
    subtitle: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
    type: 'album'
  },
  {
    id: '3',
    title: 'Starboy',
    subtitle: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    type: 'album'
  },
  {
    id: '4',
    title: 'UTOPIA',
    subtitle: 'Travis Scott',
    image: 'https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44',
    type: 'album'
  },
  {
    id: '5',
    title: 'SOS',
    subtitle: 'SZA',
    image: 'https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1',
    type: 'album'
  },
];

const madeForYou = [
  {
    id: '6',
    title: 'RapCaviar',
    subtitle: 'New music from Kendrick, Drake and more',
    image: 'https://i.scdn.co/image/ab67706f00000002919c6e3193d65ab01c03ab1d',
    type: 'playlist'
  },
  {
    id: '7',
    title: 'Today\'s Top Hits',
    subtitle: 'Ed Sheeran is on top of the Hottest 50!',
    image: 'https://i.scdn.co/image/ab67706f00000002c2c8419a7f1af5bdd974c4ac',
    type: 'playlist'
  },
  {
    id: '8',
    title: 'All Out 2010s',
    subtitle: 'The biggest songs of the 2010s.',
    image: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5',
    type: 'playlist'
  },
  {
    id: '9',
    title: 'Rock Classics',
    subtitle: 'Rock legends & epic songs.',
    image: 'https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730',
    type: 'playlist'
  },
];

// Top Albums section - new addition
const topAlbums = [
  {
    id: '10',
    title: 'After Hours',
    subtitle: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    type: 'album'
  },
  {
    id: '11',
    title: 'DAMN.',
    subtitle: 'Kendrick Lamar',
    image: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    type: 'album'
  },
  {
    id: '12',
    title: 'folklore',
    subtitle: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab67616d0000b273295450d3fc6f0780d342d907',
    type: 'album'
  },
  {
    id: '13',
    title: 'Certified Lover Boy',
    subtitle: 'Drake',
    image: 'https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f',
    type: 'album'
  },
  {
    id: '14',
    title: 'SOUR',
    subtitle: 'Olivia Rodrigo',
    image: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a',
    type: 'album'
  },
];

// Popular Artists section - new addition
const popularArtists = [
  {
    id: '15',
    title: 'The Weeknd',
    subtitle: 'Artist • 87.8M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
    type: 'artist'
  },
  {
    id: '16',
    title: 'Billie Eilish',
    subtitle: 'Artist • 56.2M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4a21b4760d2ecb7b0dcdc8da',
    type: 'artist'
  },
  {
    id: '17',
    title: 'Drake',
    subtitle: 'Artist • 78.9M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
    type: 'artist'
  },
  {
    id: '18',
    title: 'Taylor Swift',
    subtitle: 'Artist • 89.1M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676',
    type: 'artist'
  },
  {
    id: '19',
    title: 'Ed Sheeran',
    subtitle: 'Artist • 82.4M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0',
    type: 'artist'
  },
];

// Updated quick access items with real album covers
const quickAccessItems = [
  { id: '1', title: 'Liked Songs', image: 'https://misc.scdn.co/liked-songs/liked-songs-64.png', color: '#1DB954' },
  { id: '2', title: 'Midnights', image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5', color: null },
  { id: '3', title: 'UTOPIA', image: 'https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44', color: null },
  { id: '4', title: 'SOS', image: 'https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1', color: null },
  { id: '5', title: 'After Hours', image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', color: null },
  { id: '6', title: 'Starboy', image: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452', color: null },
];

export const options = {
  headerShown: false,
};

export default function HomePage() {
  const { theme } = useTheme() as { theme: ThemeState };

  const getDynamicStyles = () => {
    if (theme.mode === 'light') {
      return {
        container: { backgroundColor: '#ffffff' },
        text: { color: '#000000' },
        secondaryText: { color: '#6a6a6a' },
        card: { backgroundColor: 'rgba(0,0,0,0.04)' },
        sectionTitle: { color: '#000000' },
        playlistCard: { backgroundColor: 'rgba(0,0,0,0.04)' },
      };
    } else if (theme.mode === 'custom') {
      return {
        container: { backgroundColor: theme.customBackground },
        text: { color: theme.customText },
        secondaryText: { color: theme.customText + '80' },
        card: { backgroundColor: theme.customBackground === '#ffffff' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)' },
        sectionTitle: { color: theme.customText },
        playlistCard: { backgroundColor: theme.customBackground === '#ffffff' ? 'rgba(0,0,0,0.04)' : '#282828' },
      };
    } else {
      return {
        container: { backgroundColor: '#121212' },
        text: { color: '#ffffff' },
        secondaryText: { color: '#b3b3b3' },
        card: { backgroundColor: 'rgba(255,255,255,0.1)' },
        sectionTitle: { color: '#ffffff' },
        playlistCard: { backgroundColor: '#1a1a1a' },
      };
    }
  };

  const dynamicStyles = getDynamicStyles();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const renderQuickAccessItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.quickAccessItem, dynamicStyles.card]}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.image }} 
        style={[
          styles.quickAccessImage,
          item.color ? { backgroundColor: item.color } : null
        ]} 
      />
      <Text style={[styles.quickAccessText, dynamicStyles.text]} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderPlaylistItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.playlistItem, dynamicStyles.playlistCard]}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.image }} 
        style={[
          styles.playlistImage,
          item.type === 'artist' ? styles.artistImage : null
        ]} 
      />
      <View style={styles.playlistInfo}>
        <Text style={[styles.playlistTitle, dynamicStyles.text]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.playlistSubtitle, dynamicStyles.secondaryText]} numberOfLines={2}>
          {item.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, dynamicStyles.container]} 
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.greeting, dynamicStyles.text]}>{getGreeting()}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            {/* <Text style={styles.headerButtonText}>🔔</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            {/* <Text style={styles.headerButtonText}>🕐</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            {/* <Text style={styles.headerButtonText}>⚙️</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/32x32/1DB954/FFFFFF?text=U' }} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Access Grid */}
      <View style={styles.quickAccessSection}>
        <FlatList
          data={quickAccessItems}
          renderItem={renderQuickAccessItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.quickAccessGrid}
          columnWrapperStyle={styles.quickAccessRow}
        />
      </View>

      {/* Recently Played Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Recently played</Text>
        </View>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>

      {/* Made for You Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Made for you</Text>
        </View>
        <FlatList
          data={madeForYou}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>

      {/* Top Albums Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Popular albums</Text>
        </View>
        <FlatList
          data={topAlbums}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>

      {/* Popular Artists Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Popular artists</Text>
        </View>
        <FlatList
          data={popularArtists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>

      {/* Bottom padding for tab bar */}
      <View style={styles.bottomPadding} />
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: 20,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  quickAccessSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  quickAccessGrid: {
    gap: 8,
  },
  quickAccessRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    padding: 0,
    width: '48%',
    height: 56,
    overflow: 'hidden',
  },
  quickAccessImage: {
    width: 56,
    height: 56,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  quickAccessText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 12,
    flex: 1,
    lineHeight: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  playlistItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    width: 152,
    minHeight: 200,
  },
  playlistImage: {
    width: 128,
    height: 128,
    borderRadius: 8,
    backgroundColor: '#333',
    marginBottom: 12,
  },
  artistImage: {
    borderRadius: 64, // Makes artist images circular
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 18,
  },
  playlistSubtitle: {
    fontSize: 12,
    color: '#b3b3b3',
    lineHeight: 16,
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
});