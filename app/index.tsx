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
    title: 'Today\'s Top Hits',
    subtitle: 'Spotify',
    image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
    type: 'playlist'
  },
  {
    id: '3',
    title: 'Discover Weekly',
    subtitle: 'Your weekly mixtape',
    image: 'https://newjams-images.scdn.co/image/ab67616d0000b273/dt/v3/discover-weekly/MjAyNC0wMS0wOFQwMDowMDowMA==',
    type: 'playlist'
  },
  {
    id: '4',
    title: 'Release Radar',
    subtitle: 'Catch all the latest music',
    image: 'https://newjams-images.scdn.co/image/ab67616d0000b273/dt/v3/release-radar/MjAyNC0wMS0wOFQwMDowMDowMA==',
    type: 'playlist'
  },
  {
    id: '5',
    title: 'Daily Mix 1',
    subtitle: 'Made for you',
    image: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb55d0265636a2e2e926804ac4/1/en/default',
    type: 'playlist'
  },
];

const madeForYou = [
  {
    id: '6',
    title: 'RapCaviar',
    subtitle: 'New music from Kendrick Lamar, Future and more',
    image: 'https://i.scdn.co/image/ab67616d0000b273188307e8d6b3d1f2eb5b9b9d',
    type: 'playlist'
  },
  {
    id: '7',
    title: 'Chill Hits',
    subtitle: 'Kick back to the best new and recent chill hits.',
    image: 'https://i.scdn.co/image/ab67616d0000b2732ee8fb6a5952d05b97aefd0a',
    type: 'playlist'
  },
  {
    id: '8',
    title: 'mint',
    subtitle: 'The most comprehensive modern R&B playlist.',
    image: 'https://i.scdn.co/image/ab67616d0000b2730c68f624641dc7d8d7e75b98',
    type: 'playlist'
  },
  {
    id: '9',
    title: 'Beast Mode',
    subtitle: 'Motivational rap to get you going.',
    image: 'https://i.scdn.co/image/ab67616d0000b273d0ae52a3b89b8f1a8d35cbf3',
    type: 'playlist'
  },
];

// Top Albums section - new addition
const topAlbums = [
  {
    id: '10',
    title: 'After Hours',
    subtitle: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab67616d0000b273ac69ac9c32797e6c8d3fd0bb',
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
    image: 'https://i.scdn.co/image/ab67616d0000b273395b7ef3c7b2b77da8a6c8c8',
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
    title: 'Sour',
    subtitle: 'Olivia Rodrigo',
    image: 'https://i.scdn.co/image/ab67616d0000b2730c471c36970b9406233842a5',
    type: 'album'
  },
];

// Popular Artists section - new addition
const popularArtists = [
  {
    id: '15',
    title: 'The Weeknd',
    subtitle: 'Artist • 87.8M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb99cacf8acd537820676726',
    type: 'artist'
  },
  {
    id: '16',
    title: 'Billie Eilish',
    subtitle: 'Artist • 56.2M monthly listeners',
    image: 'https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0',
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
];

// Updated quick access items with better album covers
const quickAccessItems = [
  { id: '1', title: 'Liked Songs', image: 'https://misc.scdn.co/liked-songs/liked-songs-64.png', color: '#1DB954' },
  { id: '2', title: 'Today\'s Top Hits', image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5', color: null },
  { id: '3', title: 'Daily Mix 1', image: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb55d0265636a2e2e926804ac4/1/en/default', color: null },
  { id: '4', title: 'Discover Weekly', image: 'https://newjams-images.scdn.co/image/ab67616d0000b273/dt/v3/discover-weekly/MjAyNC0wMS0wOFQwMDowMDowMA==', color: null },
  { id: '5', title: 'Release Radar', image: 'https://newjams-images.scdn.co/image/ab67616d0000b273/dt/v3/release-radar/MjAyNC0wMS0wOFQwMDowMDowMA==', color: null },
  { id: '6', title: 'RapCaviar', image: 'https://i.scdn.co/image/ab67616d0000b273188307e8d6b3d1f2eb5b9b9d', color: null },
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