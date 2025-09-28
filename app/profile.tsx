import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ThemeState } from '../store/themeSlice';

const user = {
  name: "Zechariah Jose Refugio",
  email: "zechariahjose@email.com",
  followers: 120,
  following: 80,
  avatar: "https://via.placeholder.com/150x150/1DB954/FFFFFF?text=ZJ",
  isPremium: true,
  country: "Philippines",
  joinDate: "2020",
};

const topArtists = [
  { id: '1', name: 'The Weeknd', image: 'https://via.placeholder.com/100x100/1DB954/FFFFFF?text=TW' },
  { id: '2', name: 'Drake', image: 'https://via.placeholder.com/100x100/1DB954/FFFFFF?text=D' },
  { id: '3', name: 'Billie Eilish', image: 'https://via.placeholder.com/100x100/1DB954/FFFFFF?text=BE' },
  { id: '4', name: 'Ed Sheeran', image: 'https://via.placeholder.com/100x100/1DB954/FFFFFF?text=ES' },
];

const topGenres = ['Pop', 'Hip-Hop', 'R&B', 'Electronic', 'Rock'];

export default function Profile() {
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

  const renderArtist = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.artistItem}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={[styles.artistName, dynamicStyles.text]} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderGenre = (genre: string, index: number) => (
    <View key={index} style={[styles.genreTag, dynamicStyles.card]}>
      <Text style={[styles.genreText, dynamicStyles.text]}>{genre}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={[styles.name, dynamicStyles.text]}>{user.name}</Text>
          <Text style={[styles.email, dynamicStyles.secondaryText]}>{user.email}</Text>
          {user.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, dynamicStyles.text]}>{user.followers}</Text>
          <Text style={[styles.statLabel, dynamicStyles.secondaryText]}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, dynamicStyles.text]}>{user.following}</Text>
          <Text style={[styles.statLabel, dynamicStyles.secondaryText]}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, dynamicStyles.text]}>{user.joinDate}</Text>
          <Text style={[styles.statLabel, dynamicStyles.secondaryText]}>Joined</Text>
        </View>
      </View>

      {/* Top Artists */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Top artists this month</Text>
        <View style={styles.artistsGrid}>
          {topArtists.map((artist) => (
            <TouchableOpacity key={artist.id} style={styles.artistItem}>
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <Text style={[styles.artistName, dynamicStyles.text]} numberOfLines={1}>{artist.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Top Genres */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Top genres</Text>
        <View style={styles.genresContainer}>
          {topGenres.map((genre, index) => renderGenre(genre, index))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, dynamicStyles.card]}>
          <Text style={[styles.actionButtonText, dynamicStyles.text]}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Share Profile</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  premiumBadge: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  premiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  artistsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  artistItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  artistName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#282828',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#282828',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#1DB954',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
