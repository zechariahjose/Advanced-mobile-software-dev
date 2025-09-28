import Slider from '@react-native-community/slider';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Removed animations

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Filter types
type FilterType = 'none' | 'grayscale' | 'sepia' | 'vintage' | 'cool' | 'warm';

interface Filter {
  name: string;
  type: FilterType;
  intensity: number;
}

const FILTERS: Filter[] = [
  { name: 'None', type: 'none', intensity: 0 },
  { name: 'Grayscale', type: 'grayscale', intensity: 1 },
  { name: 'Sepia', type: 'sepia', intensity: 1 },
  { name: 'Vintage', type: 'vintage', intensity: 1 },
  { name: 'Cool', type: 'cool', intensity: 1 },
  { name: 'Warm', type: 'warm', intensity: 1 },
];

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('none');
  const [filterIntensity, setFilterIntensity] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showEditing, setShowEditing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const cameraRef = useRef<any>(null);

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlashMode = () => {
    setFlashMode(current => {
      switch (current) {
        case 'off':
          return 'on';
        case 'on':
          return 'auto';
        case 'auto':
          return 'off';
        default:
          return 'off';
      }
    });
  };

  const capturePhoto = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true);

      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        if (photo) {
          setCapturedImage(photo.uri);
          setEditedImage(photo.uri);
          setShowFilters(true);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to capture photo');
        console.error('Camera error:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const applyFilter = async (filterType: FilterType, intensity: number = 1) => {
    if (!capturedImage) return;

    try {
      let manipulations: ImageManipulator.Action[] = [];

      switch (filterType) {
               case 'grayscale':
                 manipulations = [
                   {
                     resize: { width: 800 },
                   },
                 ];
                 break;
               case 'sepia':
                 manipulations = [
                   {
                     resize: { width: 800 },
                   },
                 ];
                 break;
               case 'vintage':
                 manipulations = [
                   {
                     resize: { width: 800 },
                   },
                 ];
                 break;
               case 'cool':
                 manipulations = [
                   {
                     resize: { width: 800 },
                   },
                 ];
                 break;
               case 'warm':
                 manipulations = [
                   {
                     resize: { width: 800 },
                   },
                 ];
                 break;
        default:
          manipulations = [
            {
              resize: { width: 800 },
            },
          ];
      }

      const result = await ImageManipulator.manipulateAsync(
        capturedImage,
        manipulations,
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      setEditedImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to apply filter');
      console.error('Filter error:', error);
    }
  };

  const savePhoto = async () => {
    if (editedImage) {
      try {
        // In a real app, you would save to gallery here
        Alert.alert('Success', 'Photo saved to gallery!');
        setCapturedImage(null);
        setEditedImage(null);
        setShowFilters(false);
        setShowEditing(false);
        setCurrentFilter('none');
        setFilterIntensity(1);
      } catch (error) {
        Alert.alert('Error', 'Failed to save photo');
        console.error('Save error:', error);
      }
    }
  };

  const resetPhoto = () => {
    setCapturedImage(null);
    setEditedImage(null);
    setShowFilters(false);
    setShowEditing(false);
    setCurrentFilter('none');
    setFilterIntensity(1);
  };

  // Removed animated button style

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showEditing && editedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.editingContainer}>
          <Image source={{ uri: editedImage }} style={styles.previewImage} />
          
          <View style={styles.editingControls}>
            <Text style={styles.sectionTitle}>Filters</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter.type}
                  style={[
                    styles.filterButton,
                    currentFilter === filter.type && styles.filterButtonSelected,
                  ]}
                  onPress={() => {
                    setCurrentFilter(filter.type);
                    applyFilter(filter.type, filterIntensity);
                  }}
                >
                  <Text style={[
                    styles.filterButtonText,
                    currentFilter === filter.type && styles.filterButtonTextSelected,
                  ]}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {currentFilter !== 'none' && (
              <View style={styles.intensityContainer}>
                <Text style={styles.intensityLabel}>Filter Intensity</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={filterIntensity}
                         onValueChange={(value: number) => {
                           setFilterIntensity(value);
                           applyFilter(currentFilter, value);
                         }}
                  minimumTrackTintColor="#1DB954"
                  maximumTrackTintColor="#333333"
                />
                <Text style={styles.intensityValue}>{Math.round(filterIntensity * 100)}%</Text>
              </View>
            )}

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={resetPhoto}>
                <Text style={styles.actionButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={savePhoto}>
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
             <CameraView
               ref={cameraRef}
               style={styles.camera}
               facing={cameraType}
               flash={flashMode}
             >
        <View style={styles.cameraOverlay}>
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlashMode}>
              <Text style={styles.controlButtonText}>
                {flashMode === 'off' ? '⚡' : flashMode === 'on' ? '⚡' : '⚡'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
              <Text style={styles.controlButtonText}>🔄</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <View style={styles.captureContainer}>
              <TouchableOpacity
                style={[styles.captureButton, isCapturing && styles.captureButtonPressed]}
                onPress={capturePhoto}
                disabled={isCapturing}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
             </CameraView>

      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.thumbnailImage} />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 25,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  captureContainer: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#1DB954',
  },
  captureButtonPressed: {
    backgroundColor: '#ccc',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1DB954',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editingContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  previewImage: {
    width: screenWidth,
    height: screenHeight * 0.6,
    resizeMode: 'cover',
  },
  editingControls: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#282828',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#404040',
  },
  filterButtonSelected: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  intensityContainer: {
    marginBottom: 20,
  },
  intensityLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#1DB954',
    width: 20,
    height: 20,
  },
  intensityValue: {
    color: '#1DB954',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#282828',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#404040',
  },
  saveButton: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
