import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
// Removed animations

// Genre options
const GENRES = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop"];

// Validation functions
const validateUsername = (username: string): string | null => {
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 20) return "Username must be less than 20 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores";
  return null;
};

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validateGenre = (genre: string): string | null => {
  if (!genre) return "Please select a genre";
  return null;
};

// Simple view component (no animations)
const SimpleView = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

// Profile Preview Component (memoized for performance)
const ProfilePreview = React.memo(({ username, email, genre }: { username: string; email: string; genre: string }) => {
  const isVisible = username || email || genre;
  
  if (!isVisible) return null;

  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>Profile Preview</Text>
      <View style={styles.previewCard}>
        <Image
          source={{ 
            uri: `https://via.placeholder.com/100x100/1DB954/FFFFFF?text=${genre || 'User'}` 
          }}
          style={styles.previewAvatar}
        />
        <View style={styles.previewInfo}>
          <Text style={styles.previewUsername}>{username || "Username"}</Text>
          <Text style={styles.previewEmail}>{email || "email@example.com"}</Text>
          <Text style={styles.previewGenre}>{genre || "Genre"}</Text>
        </View>
      </View>
    </View>
  );
});

export default function ProfileForm() {
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");

  // Validation state
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [genreError, setGenreError] = useState<string | null>(null);

  // Shake animation state
  const [usernameShake, setUsernameShake] = useState(false);
  const [emailShake, setEmailShake] = useState(false);
  const [genreShake, setGenreShake] = useState(false);

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
        setGenre(cachedGenre || "");
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
        genre,
      }));
    } catch (error) {
      console.error("Error caching form data:", error);
    }
  }, [username, email, genre]);

  // Cache data whenever form changes
  useEffect(() => {
    cacheFormData();
  }, [cacheFormData]);

  // Real-time validation
  const validateField = (field: string, value: string) => {
    switch (field) {
      case "username":
        const usernameValidation = validateUsername(value);
        setUsernameError(usernameValidation);
        if (usernameValidation) {
          setUsernameShake(true);
          setTimeout(() => setUsernameShake(false), 500);
        }
        break;
      case "email":
        const emailValidation = validateEmail(value);
        setEmailError(emailValidation);
        if (emailValidation) {
          setEmailShake(true);
          setTimeout(() => setEmailShake(false), 500);
        }
        break;
      case "genre":
        const genreValidation = validateGenre(value);
        setGenreError(genreValidation);
        if (genreValidation) {
          setGenreShake(true);
          setTimeout(() => setGenreShake(false), 500);
        }
        break;
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    validateField("username", value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateField("email", value);
  };

  const handleGenreSelect = (selectedGenre: string) => {
    setGenre(selectedGenre);
    validateField("genre", selectedGenre);
  };

  const handleSubmit = async () => {
    // Validate all fields
    const usernameValidation = validateUsername(username);
    const emailValidation = validateEmail(email);
    const genreValidation = validateGenre(genre);

    setUsernameError(usernameValidation);
    setEmailError(emailValidation);
    setGenreError(genreValidation);

    // Trigger shake animations for invalid fields
    if (usernameValidation) {
      setUsernameShake(true);
      setTimeout(() => setUsernameShake(false), 500);
    }
    if (emailValidation) {
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
    }
    if (genreValidation) {
      setGenreShake(true);
      setTimeout(() => setGenreShake(false), 500);
    }

    // If all fields are valid
    if (!usernameValidation && !emailValidation && !genreValidation) {
      Alert.alert(
        "Profile Created!",
        `Welcome ${username}! Your profile has been created successfully.`,
        [
          {
            text: "OK",
            onPress: async () => {
              // Clear cache and reset form
              await AsyncStorage.removeItem("profileFormData");
              setUsername("");
              setEmail("");
              setGenre("");
              setUsernameError(null);
              setEmailError(null);
              setGenreError(null);
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.header}>Create Your Profile</Text>
        <Text style={styles.subtitle}>Join the Spotify community</Text>
      </View>

      <View style={styles.form}>
        {/* Username Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <SimpleView>
            <TextInput
              style={[styles.input, usernameError && styles.inputError]}
              placeholder="Enter username (3-20 characters)"
              placeholderTextColor="#666"
              value={username}
              onChangeText={handleUsernameChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </SimpleView>
          {usernameError && (
            <Text style={styles.errorText}>
              {usernameError}
            </Text>
          )}
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <SimpleView>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Enter email address"
              placeholderTextColor="#666"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </SimpleView>
          {emailError && (
            <Text style={styles.errorText}>
              {emailError}
            </Text>
          )}
        </View>

        {/* Genre Selection */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Favorite Genre</Text>
          <SimpleView>
            <View style={styles.genreContainer}>
              {GENRES.map((genreOption) => (
                <TouchableOpacity
                  key={genreOption}
                  style={[
                    styles.genreButton,
                    genre === genreOption && styles.genreButtonSelected,
                  ]}
                  onPress={() => handleGenreSelect(genreOption)}
                >
                  <Text
                    style={[
                      styles.genreButtonText,
                      genre === genreOption && styles.genreButtonTextSelected,
                    ]}
                  >
                    {genreOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SimpleView>
          {genreError && (
            <Text style={styles.errorText}>
              {genreError}
            </Text>
          )}
        </View>

        {/* Profile Preview */}
        <ProfilePreview username={username} email={email} genre={genre} />

        {/* Submit Button */}
        <View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#b3b3b3",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#282828",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#404040",
  },
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  genreButton: {
    backgroundColor: "#282828",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#404040",
  },
  genreButtonSelected: {
    backgroundColor: "#1DB954",
    borderColor: "#1DB954",
  },
  genreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  genreButtonTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  previewContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  previewCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },
  previewAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  previewInfo: {
    flex: 1,
  },
  previewUsername: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  previewEmail: {
    fontSize: 14,
    color: "#b3b3b3",
    marginBottom: 3,
  },
  previewGenre: {
    fontSize: 14,
    color: "#1DB954",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
