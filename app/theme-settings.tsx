import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Removed animations
import { useTheme } from '../hooks/useTheme';

// Color picker component
const ColorPicker = ({ 
  label, 
  currentColor, 
  onColorChange, 
  colors 
}: { 
  label: string; 
  currentColor: string; 
  onColorChange: (color: string) => void; 
  colors: string[]; 
}) => {
  return (
    <View style={styles.colorPickerContainer}>
      <Text style={styles.colorPickerLabel}>{label}</Text>
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
          />
        ))}
      </View>
    </View>
  );
};

// Theme preview component
const ThemePreview = ({ theme }: { theme: any }) => {
  const getPreviewStyles = () => {
    if (theme.mode === 'light') {
      return {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#1DB954',
        cardColor: '#f5f5f5',
      };
    } else if (theme.mode === 'dark') {
      return {
        backgroundColor: '#121212',
        textColor: '#ffffff',
        accentColor: '#1DB954',
        cardColor: '#1E1E1E',
      };
    } else {
      return {
        backgroundColor: theme.customBackground,
        textColor: theme.customText,
        accentColor: theme.customAccent,
        cardColor: theme.customBackground === '#ffffff' ? '#f5f5f5' : '#1E1E1E',
      };
    }
  };

  const previewStyles = getPreviewStyles();

  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>Theme Preview</Text>
      <View style={[styles.previewCard, { backgroundColor: previewStyles.cardColor }]}>
        <View style={[styles.previewHeader, { backgroundColor: previewStyles.accentColor }]}>
          <Text style={[styles.previewHeaderText, { color: '#ffffff' }]}>Spotify</Text>
        </View>
        <View style={styles.previewContent}>
          <Text style={[styles.previewText, { color: previewStyles.textColor }]}>
            Sample Text
          </Text>
          <TouchableOpacity style={[styles.previewButton, { backgroundColor: previewStyles.accentColor }]}>
            <Text style={styles.previewButtonText}>Button</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function ThemeSettings() {
  const { theme, switchToLight, switchToDark, switchToCustom, updateCustomAccent, updateCustomBackground, updateCustomText, reset } = useTheme();
  const [showCustomColors, setShowCustomColors] = useState(false);

  const accentColors = ['#1DB954', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  const backgroundColors = ['#121212', '#000000', '#1a1a1a', '#2d2d2d', '#ffffff', '#f5f5f5', '#e8e8e8'];
  const textColors = ['#ffffff', '#000000', '#b3b3b3', '#666666', '#1DB954'];

  const handleThemeChange = (mode: 'light' | 'dark' | 'custom') => {
    if (mode === 'custom') {
      setShowCustomColors(true);
    } else {
      setShowCustomColors(false);
    }
    
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
      'Reset Theme',
      'Are you sure you want to reset to default theme?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: reset }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.mode === 'light' ? '#ffffff' : '#121212' }]}>
      <View>
        <Text style={[styles.header, { color: theme.mode === 'light' ? '#000000' : '#ffffff' }]}>
          Theme Settings
        </Text>
        <Text style={[styles.subtitle, { color: theme.mode === 'light' ? '#666666' : '#b3b3b3' }]}>
          Customize your app appearance
        </Text>
      </View>

      {/* Theme Mode Selection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.mode === 'light' ? '#000000' : '#ffffff' }]}>
          Theme Mode
        </Text>
        <View style={styles.themeModeContainer}>
          <TouchableOpacity
            style={[
              styles.themeModeButton,
              theme.mode === 'light' && styles.themeModeButtonSelected,
              { borderColor: theme.mode === 'light' ? '#1DB954' : '#404040' }
            ]}
            onPress={() => handleThemeChange('light')}
          >
            <Text style={[styles.themeModeText, { color: theme.mode === 'light' ? '#1DB954' : '#b3b3b3' }]}>
              ☀️ Light
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.themeModeButton,
              theme.mode === 'dark' && styles.themeModeButtonSelected,
              { borderColor: theme.mode === 'dark' ? '#1DB954' : '#404040' }
            ]}
            onPress={() => handleThemeChange('dark')}
          >
            <Text style={[styles.themeModeText, { color: theme.mode === 'dark' ? '#1DB954' : '#b3b3b3' }]}>
              🌙 Dark
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.themeModeButton,
              theme.mode === 'custom' && styles.themeModeButtonSelected,
              { borderColor: theme.mode === 'custom' ? '#1DB954' : '#404040' }
            ]}
            onPress={() => handleThemeChange('custom')}
          >
            <Text style={[styles.themeModeText, { color: theme.mode === 'custom' ? '#1DB954' : '#b3b3b3' }]}>
              🎨 Custom
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Color Options */}
      {theme.mode === 'custom' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.mode === 'light' ? '#000000' : '#ffffff' }]}>
            Custom Colors
          </Text>
          
          <ColorPicker
            label="Accent Color"
            currentColor={theme.customAccent}
            onColorChange={updateCustomAccent}
            colors={accentColors}
          />
          
          <ColorPicker
            label="Background Color"
            currentColor={theme.customBackground}
            onColorChange={updateCustomBackground}
            colors={backgroundColors}
          />
          
          <ColorPicker
            label="Text Color"
            currentColor={theme.customText}
            onColorChange={updateCustomText}
            colors={textColors}
          />
        </View>
      )}

      {/* Theme Preview */}
      <ThemePreview theme={theme} />

      {/* Reset Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset to Default</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  themeModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeModeButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 2,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  themeModeButtonSelected: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
  themeModeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  colorPickerContainer: {
    marginBottom: 20,
  },
  colorPickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#ffffff',
    borderWidth: 3,
  },
  previewContainer: {
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  previewCard: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  previewHeader: {
    padding: 15,
    alignItems: 'center',
  },
  previewHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewContent: {
    padding: 15,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  previewButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
