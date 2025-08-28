import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';

export default function HomeScreen() {
  const [showImage, setShowImage] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed', 'You tapped the button!');
    setShowImage(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>WELCOME!</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Zechariah Jose Refugio</Text>
        <Text style={styles.text}>
          This is an example of the <Text style={{ fontWeight: 'bold' }}>Text</Text> component.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Surprise</Text>
        <Button title="Tap Me" onPress={handlePress} color="#007AFF" />

        {showImage && (
          <Image
            source={{ uri: 'https://placekitten.com/300/200' }}
            style={styles.hiddenImage}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Image Component</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 30,
    color: '#1e1e1e',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 120,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  hiddenImage: {
    width: '100%',
    height: 180,
    marginTop: 16,
    borderRadius: 8,
  },
});
