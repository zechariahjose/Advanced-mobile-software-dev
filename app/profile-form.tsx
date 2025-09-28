import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Enhanced genre options with emojis
const GENRES = [
  { id: "pop", name: "Pop", emoji: "🎵", color: "#ff6b6b" },
  { id: "rock", name: "Rock", emoji: "🎸", color: "#4ecdc4" },
  { id: "hiphop", name: "Hip-Hop", emoji: "🎤", color: "#45b7d1" },
  { id: "jazz", name: "Jazz", emoji: "🎷", color: "#96ceb4" },
  { id: "electronic", name: "Electronic", emoji: "🎧", color: "#ffeaa7" },
  { id: "classical", name: "Classical", emoji: "🎻", color: "#dda0dd" },
  { id: "indie", name: "Indie", emoji: "🎨", color: "#ff7675" },
  { id: "rnb", name: "R&B", emoji: "💫", color: "#74b9ff" },
];

// Enhanced validation functions
const validateUsername = (username: string): string | null => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 30) return "Username must be less than 30 characters";
  if (!/^[a-zA-Z0-9._]+$/.test(username)) return "Username can only contain letters, numbers, dots, and underscores";
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validateGenre = (genre: string): string | null => {
  if (!genre) return "Please select your favorite genre";
  return null;
};

// Profile Preview Component
const ProfilePreview = React.memo(({ username, email, selectedGenre }: { 
  username: string; 
  email: string; 
  selectedGenre: any; 
}) => {
  const hasContent = username || email || selectedGenre;
  
  if (!hasContent) return null;

  return (
    <View style={styles.previewSection}>
      <Text style={styles.previewTitle}>Your profile preview</Text>
      <View style={styles.previewCard}>
        <View style={styles.previewAvatarContainer}>
          <View style={[
            styles.previewAvatar, 
            { backgroundColor: selectedGenre?.color || '#1DB954' }
          ]}>
            <Text style={styles.previewAvatarText}>
              {selectedGenre?.emoji || username?.charAt(0)?.toUpperCase() || '👤'}
            </Text>
          </View>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Free</Text>
          </View>
        </View>
        
        <View style={styles.previewInfo}>
          <Text style={styles.previewUsername}>
            {username || "Your username"}
          </Text>
          <Text style={styles.previewEmail}>
            {email || "your.email@example.com"}
          </Text>
          <View style={styles.previewStats}>
            <Text style={styles.previewStat}>0 followers</Text>
            <Text style={styles.previewStat}>•</Text>
            <Text style={styles.previewStat}>0 following</Text>
          </View>
          {selectedGenre && (
            <View style={styles.genreTag}>
              <Text style={styles.genreTagEmoji}>{selectedGenre.emoji}</Text>
              <Text style={styles.genreTagText}>{selectedGenre.name} lover</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

export default function ProfileForm() {
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Validation state
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [genreError, setGenreError] = useState<string | null>(null);

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Progress calculation
  const totalSteps = 3;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Load cached data on mount
  useEffect(() => {
    loadCachedData();
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("profileFormData");
      if (cachedData) {
        const { username: cachedUsername, email: cachedEmail, genre: cachedGenre } = JSON.parse(cachedData);
        setUsername(cachedUsername || "");
        setEmail(cachedEmail || "");
        if (cachedGenre) {
          setSelectedGenre(GENRES.find(g => g.id === cachedGenre) || null);
        }
      }
    } catch (error) {
      console.error("Error loading cached data:", error);
    }
  };

  // Cache form data
  const cacheFormData = useCallback(async () => {
    try {
      await AsyncStorage.setItem("profileFormData", JSON.stringify({
        username,
        email,
        genre: selectedGenre?.id || "",
      }));
    } catch (error) {
      console.error("Error caching form data:", error);
    }
  }, [username, email, selectedGenre]);

  // Cache data whenever form changes
  useEffect(() => {
    cacheFormData();
  }, [cacheFormData]);

  // Field validation
  const validateField = (field: string, value: string | any) => {
    switch (field) {
      case "username":
        setUsernameError(validateUsername(value));
        break;
      case "email":
        setEmailError(validateEmail(value));
        break;
      case "genre":
        setGenreError(validateGenre(value?.id || ""));
        break;
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (usernameError) validateField("username", value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) validateField("email", value);
  };

  const handleGenreSelect = (genre: any) => {
    setSelectedGenre(genre);
    validateField("genre", genre);
  };

  const handleNext = () => {
    let isValid = true;

    if (currentStep === 0) {
      const usernameValidation = validateUsername(username);
      setUsernameError(usernameValidation);
      if (usernameValidation) isValid = false;
    } else if (currentStep === 1) {
      const emailValidation = validateEmail(email);
      setEmailError(emailValidation);
      if (emailValidation) isValid = false;
    } else if (currentStep === 2) {
      const genreValidation = validateGenre(selectedGenre?.id || "");
      setGenreError(genreValidation);
      if (genreValidation) isValid = false;
    }

    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === totalSteps - 1) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(async () => {
      Alert.alert(
        "Welcome to Spotify!",
        `Hey ${username}! Your profile has been created. Start discovering music you'll love.`,
        [
          {
            text: "Let's go",
            onPress: async () => {
              await AsyncStorage.removeItem("profileFormData");
              setUsername("");
              setEmail("");
              setSelectedGenre(null);
              setCurrentStep(0);
              setUsernameError(null);
              setEmailError(null);
              setGenreError(null);
            },
          },
        ]
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>What's your name?</Text>
              <Text style={styles.stepDescription}>
                This will be your username on Spotify. You can always change it later.
              </Text>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, usernameError && styles.inputError]}
                placeholder="Username"
                placeholderTextColor="#6a6a6a"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
              />
              {usernameError && (
                <Text style={styles.errorText}>{usernameError}</Text>
              )}
              <Text style={styles.inputHint}>
                3-30 characters. Use letters, numbers, dots, or underscores.
              </Text>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>What's your email?</Text>
              <Text style={styles.stepDescription}>
                We'll use this to send you updates about your account and music recommendations.
              </Text>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, emailError && styles.inputError]}
                placeholder="Email address"
                placeholderTextColor="#6a6a6a"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
              />
              {emailError && (
                <Text style={styles.errorText}>{emailError}</Text>
              )}
              <Text style={styles.inputHint}>
                We'll keep your email private and secure.
              </Text>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>What do you love?</Text>
              <Text style={styles.stepDescription}>
                Choose your favorite genre so we can recommend music you'll enjoy.
              </Text>
            </View>
            
            <View style={styles.genreGrid}>
              {GENRES.map((genre) => (
                <TouchableOpacity
                  key={genre.id}
                  style={[
                    styles.genreCard,
                    selectedGenre?.id === genre.id && styles.genreCardSelected,
                  ]}
                  onPress={() => handleGenreSelect(genre)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.genreIcon, { backgroundColor: genre.color }]}>
                    <Text style={styles.genreEmoji}>{genre.emoji}</Text>
                  </View>
                  <Text style={styles.genreName}>{genre.name}</Text>
                  {selectedGenre?.id === genre.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            {genreError && (
              <Text style={styles.errorText}>{genreError}</Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{currentStep + 1} of {totalSteps}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {renderStepContent()}
        
        {/* Profile Preview */}
        <ProfilePreview 
          username={username} 
          email={email} 
          selectedGenre={selectedGenre} 
        />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.buttonRow}>
          {currentStep > 0 && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[
              styles.nextButton, 
              currentStep === 0 && styles.nextButtonFull,
              isSubmitting && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={isSubmitting}
            activeOpacity={0.7}
          >
            {isSubmitting ? (
              <Text style={styles.nextButtonText}>Creating profile...</Text>
            ) : (
              <Text style={styles.nextButtonText}>
                {currentStep === totalSteps - 1 ? "Create profile" : "Next"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
    gap: 12,
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#282828',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#b3b3b3',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepContainer: {
    marginBottom: 32,
  },
  stepHeader: {
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 40,
  },
  stepDescription: {
    fontSize: 16,
    color: '#b3b3b3',
    lineHeight: 24,
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#404040',
    minHeight: 56,
  },
  inputError: {
    borderColor: '#e22134',
    borderWidth: 2,
  },
  inputHint: {
    fontSize: 13,
    color: '#6a6a6a',
    marginTop: 4,
  },
  errorText: {
    color: '#e22134',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  genreCard: {
    width: '47%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  genreCardSelected: {
    borderColor: '#1DB954',
    backgroundColor: '#1a1a1a',
  },
  genreIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  genreEmoji: {
    fontSize: 24,
  },
  genreName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  previewSection: {
    marginTop: 32,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  previewCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  previewAvatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  previewAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewAvatarText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#282828',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  premiumText: {
    color: '#b3b3b3',
    fontSize: 10,
    fontWeight: 'bold',
  },
  previewInfo: {
    alignItems: 'center',
    gap: 4,
  },
  previewUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  previewEmail: {
    fontSize: 14,
    color: '#b3b3b3',
    textAlign: 'center',
  },
  previewStats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  previewStat: {
    fontSize: 13,
    color: '#b3b3b3',
  },
  genreTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
    gap: 6,
  },
  genreTagEmoji: {
    fontSize: 14,
  },
  genreTagText: {
    fontSize: 13,
    color: '#1DB954',
    fontWeight: '600',
  },
  bottomActions: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonDisabled: {
    backgroundColor: '#404040',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});