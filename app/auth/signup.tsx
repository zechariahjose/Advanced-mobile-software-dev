import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const logo = require('../../assets/images/spotify-logo--.png');

export const options = {
  headerShown: false,
};

export default function Signup() {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !fullname || !password) return; // basic validation
    await AsyncStorage.setItem("isLoggedIn", "true");
    router.replace('/'); // go to Home after signup
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brand}>Spotify</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#b3b3b3"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#b3b3b3"
          style={styles.input}
          value={fullname}
          onChangeText={setFullname}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Date of Birth */}
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.dobContainer}>
          <TextInput
            placeholder="DD"
            placeholderTextColor="#b3b3b3"
            style={[styles.input, styles.dobInput]}
            value={dob.day}
            onChangeText={(val) => setDob({ ...dob, day: val })}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            placeholder="MM"
            placeholderTextColor="#b3b3b3"
            style={[styles.input, styles.dobInput]}
            value={dob.month}
            onChangeText={(val) => setDob({ ...dob, month: val })}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            placeholder="YYYY"
            placeholderTextColor="#b3b3b3"
            style={[styles.input, styles.dobInput]}
            value={dob.year}
            onChangeText={(val) => setDob({ ...dob, year: val })}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Male' && styles.genderSelected]}
            onPress={() => setGender('Male')}
          >
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Female' && styles.genderSelected]}
            onPress={() => setGender('Female')}
          >
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Signup Button → goes directly to homepage */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Social Signup */}
      <Text style={styles.connectText}>Sign up with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={30} color="#fff" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="google" size={30} color="#fff" style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Already have account */}
      <View style={styles.loginContainer}>
        <Text style={{ color: '#b3b3b3' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/spotify')}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 120, height: 120, marginBottom: 10 },
  brand: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  inputContainer: { width: '100%', marginBottom: 20 },
  input: { backgroundColor: '#282828', color: '#fff', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 30, marginBottom: 15, fontSize: 16 },
  label: { color: '#fff', marginBottom: 5, marginLeft: 10, fontSize: 14 },
  dobContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  dobInput: { flex: 1, marginRight: 10 },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  genderButton: { flex: 1, backgroundColor: '#282828', paddingVertical: 12, borderRadius: 30, alignItems: 'center', marginHorizontal: 5 },
  genderSelected: { backgroundColor: '#1DB954' },
  genderText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  signupButton: { backgroundColor: '#1DB954', paddingVertical: 14, borderRadius: 30, width: '100%', marginTop: 10, marginBottom: 20, alignItems: 'center' },
  signupButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  connectText: { color: '#b3b3b3', marginBottom: 10 },
  socialContainer: { flexDirection: 'row', marginBottom: 30 },
  socialIcon: { marginHorizontal: 15 },
  loginContainer: { flexDirection: 'row' },
  loginText: { color: '#fff', fontWeight: 'bold' },
});
//
