import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

// Color picker component with Spotify styling
const ColorPicker = ({ 
  label, 
  currentColor, 
  onColorChange, 
  colors,
  theme
}: { 
  label: string; 
  currentColor: string; 
  onColorChange: (color: string) => void; 
  colors: string[];
  theme: any;
}) => {
  const getDynamicStyles = () => {
    if (theme.mode === 'light') {
      return {
        labelColor: '#000000',
        backgroundColor: '#f8f8f8',
      };
    } else if (theme.mode === 'custom') {
      return {
        labelColor: theme.customText,
        backgroundColor: theme.customBackground === '#ffffff' ? '#f8f8f8' : '#1e1e1e',
      };
    } else {
      return {
        labelColor: '#ffffff',
        backgroundColor: '#1e1e1e',
      };
    }
  };

  const dynamicStyles = getDynamicStyles();

  return (
    <View style={[styles.settingItem, { backgroundColor: dynamicStyles.backgroundColor }]}>
      <Text style={[styles.settingLabel, { color: dynamicStyles.labelColor }]}>{label}</Text>
      <Text style={[styles.settingDescription, { color: dynamicStyles.labelColor + '80' }]}>
        Choose your preferred {label.toLowerCase()}
      </Text>
      <View style={styles.colorGrid}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              currentColor === color && styles.colorOptionSelected,
            ]}
            onPress={() => onColorChange(color)}
            activeOpacity={0.7}
          />
        ))}
      </View>
    </View>
  );
};

// Theme preview with Spotify-like mini interface
const ThemePreview = ({ theme }: { theme: any }) => {
  const getPreviewStyles = () => {
    if (theme.mode === 'light') {
      return {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#1DB954',
        cardColor: '#f8f8f8',
        secondaryText: '#6a6a6a',
      };
    } else if (theme.mode === 'dark') {
      return {
        backgroundColor: '#121212',
        textColor: '#ffffff',
        accentColor: '#1DB954',
        cardColor: '#1e1e1e',
        secondaryText: '#b3b3b3',
      };
    } else {
      return {
        backgroundColor: theme.customBackground,
        textColor: theme.customText,
        accentColor: theme.customAccent,
        cardColor: theme.customBackground === '#ffffff' ? '#f8f8f8' : '#1e1e1e',
        secondaryText: theme.customText + '80',
      };
    }
  };

  const previewStyles = getPreviewStyles();

  return (
    <View style={[styles.previewContainer, { backgroundColor: previewStyles.cardColor }]}>
      <View style={styles.previewHeader}>
        <Text style={[styles.previewTitle, { color: previewStyles.textColor }]}>Preview</Text>
      </View>
      
      <View style={[styles.miniSpotifyInterface, { backgroundColor: previewStyles.backgroundColor }]}>
        {/* Mini header */}
        <View style={styles.miniHeader}>
          <Text style={[styles.miniHeaderText, { color: previewStyles.textColor }]}>Good afternoon</Text>
          <View style={[styles.miniProfilePic, { backgroundColor: previewStyles.accentColor }]} />
        </View>
        
        {/* Mini quick access */}
        <View style={styles.miniQuickAccess}>
          <View style={[styles.miniQuickItem, { backgroundColor: previewStyles.cardColor }]}>
            <View style={[styles.miniAlbumCover, { backgroundColor: previewStyles.accentColor }]} />
            <Text style={[styles.miniQuickText, { color: previewStyles.textColor }]} numberOfLines={1}>
              Liked Songs
            </Text>
          </View>
          <View style={[styles.miniQuickItem, { backgroundColor: previewStyles.cardColor }]}>
            <View style={[styles.miniAlbumCover, { backgroundColor: '#ff6b6b' }]} />
            <Text style={[styles.miniQuickText, { color: previewStyles.textColor }]} numberOfLines={1}>
              Daily Mix 1
            </Text>
          </View>
        </View>
        
        {/* Mini section */}
        <View style={styles.miniSection}>
          <Text style={[styles.miniSectionTitle, { color: previewStyles.textColor }]}>Recently played</Text>
          <View style={styles.miniPlaylistRow}>
            <View style={[styles.miniPlaylistCover, { backgroundColor: '#4ecdc4' }]} />
            <View>
              <Text style={[styles.miniPlaylistName, { color: previewStyles.textColor }]}>Top Hits</Text>
              <Text style={[styles.miniPlaylistDesc, { color: previewStyles.secondaryText }]}>Spotify</Text>
            </View>
          </View>
        </View>
        
        {/* Mini player */}
        <View style={[styles.miniPlayer, { backgroundColor: previewStyles.cardColor }]}>
          <View style={[styles.miniPlayerAlbum, { backgroundColor: previewStyles.accentColor }]} />
          <View style={styles.miniPlayerInfo}>
            <Text style={[styles.miniPlayerSong, { color: previewStyles.textColor }]} numberOfLines={1}>
              Song Title
            </Text>
            <Text style={[styles.miniPlayerArtist, { color: previewStyles.secondaryText }]} numberOfLines={1}>
              Artist Name
            </Text>
          </View>
          <View style={[styles.miniPlayButton, { backgroundColor: previewStyles.accentColor }]} />
        </View>
      </View>
    </View>
  );
};

export default function ThemeSettings() {
  const { theme, switchToLight, switchToDark, switchToCustom, updateCustomAccent, updateCustomBackground, updateCustomText, reset } = useTheme();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const getDynamicStyles = () => {
    if (theme.mode === 'light') {
      return {
        container: { backgroundColor: '#ffffff' },
        text: { color: '#000000' },
        secondaryText: { color: '#6a6a6a' },
        settingItem: { backgroundColor: '#f8f8f8' },
        border: { borderColor: '#e6e6e6' },
      };
    } else if (theme.mode === 'custom') {
      return {
        container: { backgroundColor: theme.customBackground },
        text: { color: theme.customText },
        secondaryText: { color: theme.customText + '80' },
        settingItem: { backgroundColor: theme.customBackground === '#ffffff' ? '#f8f8f8' : '#1e1e1e' },
        border: { borderColor: theme.customText + '20' },
      };
    } else {
      return {
        container: { backgroundColor: '#121212' },
        text: { color: '#ffffff' },
        secondaryText: { color: '#b3b3b3' },
        settingItem: { backgroundColor: '#1e1e1e' },
        border: { borderColor: '#2a2a2a' },
      };
    }
  };

  const dynamicStyles = getDynamicStyles();

  const accentColors = ['#1DB954', '#1ed760', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff7675', '#74b9ff'];
  const backgroundColors = ['#121212', '#000000', '#1a1a1a', '#2d2d2d', '#ffffff', '#f8f8f8', '#e6e6e6', '#1e1e1e'];
  const textColors = ['#ffffff', '#000000', '#b3b3b3', '#6a6a6a', '#1DB954', '#ff6b6b', '#4ecdc4'];

  const handleThemeChange = (mode: 'light' | 'dark' | 'custom') => {
    switch (mode) {
      case 'light':
        switchToLight();
        break;
      case 'dark':
        switchToDark();
        break;
      case 'custom':
        switchToCustom();
        break;
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset theme settings',
      'This will reset all theme settings to default. Are you sure?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
        { 
          text: 'Reset', 
          style: 'destructive', 
          onPress: reset 
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, dynamicStyles.container]}
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, dynamicStyles.text]}>Display</Text>
      </View>

      {/* Current Theme Status */}
      <View style={[styles.currentThemeCard, dynamicStyles.settingItem]}>
        <View style={styles.currentThemeInfo}>
          <Text style={[styles.currentThemeTitle, dynamicStyles.text]}>Current theme</Text>
          <Text style={[styles.currentThemeMode, dynamicStyles.secondaryText]}>
            {theme.mode === 'light' ? '☀️ Light' : theme.mode === 'dark' ? '🌙 Dark' : '🎨 Custom'}
          </Text>
        </View>
        <View style={[styles.themeIndicator, { 
          backgroundColor: theme.mode === 'custom' ? theme.customAccent : '#1DB954' 
        }]} />
      </View>

      {/* Theme Options */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.text]}>Theme</Text>
        <Text style={[styles.sectionDescription, dynamicStyles.secondaryText]}>
          Choose how Spotify looks to you
        </Text>

        <View style={styles.themeOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              dynamicStyles.settingItem,
              theme.mode === 'light' && { borderColor: '#1DB954', borderWidth: 2 }
            ]}
            onPress={() => handleThemeChange('light')}
            activeOpacity={0.7}
          >
            <View style={styles.themeOptionContent}>
              <Text style={styles.themeEmoji}>☀️</Text>
              <Text style={[styles.themeOptionTitle, dynamicStyles.text]}>Light</Text>
              <Text style={[styles.themeOptionDesc, dynamicStyles.secondaryText]}>
                Easy on the eyes in bright environments
              </Text>
            </View>
            {theme.mode === 'light' && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              dynamicStyles.settingItem,
              theme.mode === 'dark' && { borderColor: '#1DB954', borderWidth: 2 }
            ]}
            onPress={() => handleThemeChange('dark')}
            activeOpacity={0.7}
          >
            <View style={styles.themeOptionContent}>
              <Text style={styles.themeEmoji}>🌙</Text>
              <Text style={[styles.themeOptionTitle, dynamicStyles.text]}>Dark</Text>
              <Text style={[styles.themeOptionDesc, dynamicStyles.secondaryText]}>
                Less glare in low light environments
              </Text>
            </View>
            {theme.mode === 'dark' && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              dynamicStyles.settingItem,
              theme.mode === 'custom' && { borderColor: '#1DB954', borderWidth: 2 }
            ]}
            onPress={() => handleThemeChange('custom')}
            activeOpacity={0.7}
          >
            <View style={styles.themeOptionContent}>
              <Text style={styles.themeEmoji}>🎨</Text>
              <Text style={[styles.themeOptionTitle, dynamicStyles.text]}>Custom</Text>
              <Text style={[styles.themeOptionDesc, dynamicStyles.secondaryText]}>
                Personalize with your own colors
              </Text>
            </View>
            {theme.mode === 'custom' && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Colors Section */}
      {theme.mode === 'custom' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Customize colors</Text>
          <Text style={[styles.sectionDescription, dynamicStyles.secondaryText]}>
            Make Spotify truly yours
          </Text>
          
          <ColorPicker
            label="Accent color"
            currentColor={theme.customAccent}
            onColorChange={updateCustomAccent}
            colors={accentColors}
            theme={theme}
          />
          
          <ColorPicker
            label="Background color"
            currentColor={theme.customBackground}
            onColorChange={updateCustomBackground}
            colors={backgroundColors}
            theme={theme}
          />
          
          <ColorPicker
            label="Text color"
            currentColor={theme.customText}
            onColorChange={updateCustomText}
            colors={textColors}
            theme={theme}
          />
        </View>
      )}

      {/* Theme Preview */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, dynamicStyles.text]}>Preview</Text>
        <Text style={[styles.sectionDescription, dynamicStyles.secondaryText]}>
          See how your theme looks
        </Text>
        <ThemePreview theme={theme} />
      </View>

      {/* Advanced Settings Toggle */}
      <View style={[styles.settingItem, dynamicStyles.settingItem]}>
        <View style={styles.settingContent}>
          <Text style={[styles.settingLabel, dynamicStyles.text]}>Advanced settings</Text>
          <Text style={[styles.settingDescription, dynamicStyles.secondaryText]}>
            Show additional customization options
          </Text>
        </View>
        <Switch
          value={showAdvanced}
          onValueChange={setShowAdvanced}
          trackColor={{ false: '#767577', true: '#1DB954' }}
          thumbColor={showAdvanced ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      {/* Reset Section */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.resetButton, dynamicStyles.border]} 
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>Reset all settings</Text>
          <Text style={styles.resetButtonDesc}>Restore default theme settings</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  currentThemeCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentThemeInfo: {
    flex: 1,
  },
  currentThemeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentThemeMode: {
    fontSize: 14,
  },
  themeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  themeOptionsContainer: {
    gap: 12,
  },
  themeOption: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  themeOptionContent: {
    flex: 1,
  },
  themeEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  themeOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeOptionDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingItem: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#ffffff',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  previewContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  previewHeader: {
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  miniSpotifyInterface: {
    borderRadius: 12,
    padding: 12,
    minHeight: 200,
  },
  miniHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  miniProfilePic: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  miniQuickAccess: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  miniQuickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 4,
    padding: 6,
  },
  miniAlbumCover: {
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 6,
  },
  miniQuickText: {
    fontSize: 10,
    fontWeight: '600',
    flex: 1,
  },
  miniSection: {
    marginBottom: 12,
  },
  miniSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  miniPlaylistRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniPlaylistCover: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 8,
  },
  miniPlaylistName: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  miniPlaylistDesc: {
    fontSize: 9,
  },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    padding: 8,
    marginTop: 'auto',
  },
  miniPlayerAlbum: {
    width: 24,
    height: 24,
    borderRadius: 2,
    marginRight: 8,
  },
  miniPlayerInfo: {
    flex: 1,
  },
  miniPlayerSong: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 1,
  },
  miniPlayerArtist: {
    fontSize: 8,
  },
  miniPlayButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  resetButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  resetButtonText: {
    color: '#ff4757',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resetButtonDesc: {
    color: '#ff4757',
    fontSize: 12,
    opacity: 0.8,
  },
  bottomPadding: {
    height: 100,
  },
});