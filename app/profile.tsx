import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ThemeState } from '../store/themeSlice';

const user = {
  name: "Zechariah Jose Refugio",
  email: "zechariahjose@email.com",
  followers: 12,
  following: 5,
  avatar: "https://via.placeholder.com/200x200/1DB954/FFFFFF?text=ZJ",
  isPremium: true,
  country: "Philippines",
  joinDate: "2020",
};

const recentPlaylists = [
  {
    id: '1',
    name: 'My Playlist #1',
    songs: 47,
    image: 'https://mosaic.scdn.co/300/ab67616d0000b2730896558a0e70c4ec6894ad5c',
    isPublic: true
  },
  {
    id: '2',
    name: 'Liked Songs',
    songs: 234,
    image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
    isPublic: false
  },
  {
    id: '3',
    name: 'Chill Vibes',
    songs: 89,
    image: 'https://i.scdn.co/image/ab67616d0000b2732ee8fb6a5952d05b97aefd0a',
    isPublic: true
  },
  {
    id: '4',
    name: 'Workout',
    songs: 32,
    image: 'https://i.scdn.co/image/ab67616d0000b273d0ae52a3b89b8f1a8d35cbf3',
    isPublic: false
  },
];

const topArtists = [
  { 
    id: '1', 
    name: 'The Weeknd', 
    image: 'https://i.scdn.co/image/ab6761610000e5ebb99cacf8acd537820676726', 
    followers: '87.8M',
    isFollowing: true
  },
  { 
    id: '2', 
    name: 'Billie Eilish', 
    image: 'https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0', 
    followers: '56.2M',
    isFollowing: true
  },
  { 
    id: '3', 
    name: 'Drake', 
    image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9', 
    followers: '78.9M',
    isFollowing: false
  },
  { 
    id: '4', 
    name: 'Taylor Swift', 
    image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676', 
    followers: '89.1M',
    isFollowing: true
  },
];

export default function Profile() {
  const { theme } = useTheme() as { theme: ThemeState };

  const getDynamicStyles = () => {
    if (theme.mode === 'light') {
      return {
        container: { backgroundColor: '#ffffff' },
        text: { color: '#000000' },
        secondaryText: { color: '#6a6a6a' },
        card: { backgroundColor: '#f8f8f8' },
        sectionTitle: { color: '#000000' },
        border: { borderColor: '#e6e6e6' },
        headerBg: { backgroundColor: '#ffffff' },
      };
    } else if (theme.mode === 'custom') {
      return {
        container: { backgroundColor: theme.customBackground },
        text: { color: theme.customText },
        secondaryText: { color: theme.customText + '80' },
        card: { backgroundColor: theme.customBackground === '#ffffff' ? '#f8f8f8' : '#1e1e1e' },
        sectionTitle: { color: theme.customText },
        border: { borderColor: theme.customText + '20' },
        headerBg: { backgroundColor: theme.customBackground },
      };
    } else {
      return {
        container: { backgroundColor: '#121212' },
        text: { color: '#ffffff' },
        secondaryText: { color: '#b3b3b3' },
        card: { backgroundColor: '#1e1e1e' },
        sectionTitle: { color: '#ffffff' },
        border: { borderColor: '#2a2a2a' },
        headerBg: { backgroundColor: '#121212' },
      };
    }
  };

  const dynamicStyles = getDynamicStyles();

  const renderPlaylist = (playlist: any) => (
    <TouchableOpacity key={playlist.id} style={[styles.playlistItem, dynamicStyles.card]}>
      <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
      <View style={styles.playlistInfo}>
        <Text style={[styles.playlistName, dynamicStyles.text]} numberOfLines={1}>
          {playlist.name}
        </Text>
        <View style={styles.playlistMeta}>
          <Text style={[styles.playlistSongs, dynamicStyles.secondaryText]}>
            {playlist.songs} songs
          </Text>
          {playlist.isPublic ? (
            <Text style={[styles.publicTag, dynamicStyles.secondaryText]}> • Public</Text>
          ) : (
            <Text style={[styles.privateTag, dynamicStyles.secondaryText]}> • Private</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={[styles.moreButtonText, dynamicStyles.secondaryText]}>⋯</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderArtist = (artist: any) => (
    <TouchableOpacity key={artist.id} style={styles.artistItem}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <View style={styles.artistInfo}>
        <Text style={[styles.artistName, dynamicStyles.text]} numberOfLines={1}>
          {artist.name}
        </Text>
        <Text style={[styles.artistFollowers, dynamicStyles.secondaryText]}>
          {artist.followers} followers
        </Text>
      </View>
      <TouchableOpacity 
        style={[
          styles.followButton, 
          artist.isFollowing ? styles.followingButton : styles.notFollowingButton
        ]}
      >
        <Text style={[
          styles.followButtonText,
          artist.isFollowing ? styles.followingText : styles.notFollowingText
        ]}>
          {artist.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, dynamicStyles.container]} 
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* Header with gradient effect */}
      <View style={[styles.header, dynamicStyles.headerBg]}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={[styles.name, dynamicStyles.text]}>{user.name}</Text>
          
          <View style={styles.statsRow}>
            <Text style={[styles.statsText, dynamicStyles.secondaryText]}>
              {user.followers} followers • {user.following} following
            </Text>
          </View>

          {user.isPremium && (
            <View style={styles.premiumContainer}>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumIcon}>♦</Text>
                <Text style={styles.premiumText}>Spotify Premium</Text>
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.followButton]}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, dynamicStyles.card]}>
            <Text style={[styles.actionButtonText, dynamicStyles.text]}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shuffleButton}>
            <Text style={styles.shuffleIcon}>🔀</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recently Created Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Recently created</Text>
        {recentPlaylists.map(renderPlaylist)}
      </View>

      {/* Top Artists Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Following</Text>
          <TouchableOpacity>
            <Text style={styles.showAllText}>Show all</Text>
          </TouchableOpacity>
        </View>
        {topArtists.map(renderArtist)}
      </View>

      {/* Bottom padding */}
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
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  statsRow: {
    marginBottom: 16,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '400',
  },
  premiumContainer: {
    marginBottom: 8,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  premiumIcon: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 6,
  },
  premiumText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffleIcon: {
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  showAllText: {
    color: '#b3b3b3',
    fontSize: 14,
    fontWeight: '600',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  playlistMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistSongs: {
    fontSize: 13,
  },
  publicTag: {
    fontSize: 13,
  },
  privateTag: {
    fontSize: 13,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 12,
  },
  artistImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
  },
  artistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  artistFollowers: {
    fontSize: 13,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  followingButton: {
    borderColor: '#404040',
    backgroundColor: 'transparent',
  },
  notFollowingButton: {
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
  followButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  followingText: {
    color: '#b3b3b3',
  },
  notFollowingText: {
    color: '#ffffff',
  },
  bottomPadding: {
    height: 100,
  },
});