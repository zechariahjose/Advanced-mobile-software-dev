import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const logo = require('../../assets/images/spotify-logo--.png');

export default function SpotifyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Logo + Brand */}
      <View style={styles.header}>
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brand}>Spotify</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#b3b3b3"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Be Connect With */}
      <Text style={styles.connectText}>Be connect with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={30} color="#fff" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="google" size={30} color="#fff" style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Signup Link */}
      <View style={styles.signupContainer}>
        <Text style={{ color: '#b3b3b3' }}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupText}>Sign up for Spotify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 150,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  brand: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#282828',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: '#b3b3b3',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectText: {
    color: '#b3b3b3',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
