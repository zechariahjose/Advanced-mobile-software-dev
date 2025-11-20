import type { LocationSubscription } from 'expo-location';
import * as ExpoLocation from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebView } from 'react-native-webview';

type LatLng = { latitude: number; longitude: number };
type Region = { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };

type PointOfInterest = {
  id: string;
  title: string;
  description: string;
  coordinate: LatLng;
  radius: number;
};

const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'studio',
    title: 'Refugio Creative Studio',
    description: 'Collab with local artists',
    coordinate: { latitude: 37.787974, longitude: -122.407437 },
    radius: 120,
  },
  {
    id: 'vinyl',
    title: 'Vinyl Trading Post',
    description: 'Swap classics & discover gems',
    coordinate: { latitude: 37.791168, longitude: -122.40549 },
    radius: 100,
  },
  {
    id: 'listening',
    title: 'Pop-up Listening Lounge',
    description: 'Weekly curated sessions',
    coordinate: { latitude: 37.78935, longitude: -122.41096 },
    radius: 140,
  },
];

const defaultRegion: Region = {
  latitude: pointsOfInterest[0].coordinate.latitude,
  longitude: pointsOfInterest[0].coordinate.longitude,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MapScreen = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [lastEvent, setLastEvent] = useState<string>('Getting your location...');
  const [mapTheme, setMapTheme] = useState<'google' | 'retro'>('google');
  const [mapRegion, setMapRegion] = useState<Region>(defaultRegion);
  const webViewRef = useRef<WebView>(null);
  const expoWatch = useRef<LocationSubscription | null>(null);
  const geofenceState = useRef<Record<string, boolean>>({});

  const haversineDistance = (coord1: LatLng, coord2: LatLng) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371000;

    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);

    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const evaluateGeofences = useCallback((location: LatLng) => {
    pointsOfInterest.forEach((poi) => {
      const distance = haversineDistance(location, poi.coordinate);
      const inside = distance <= poi.radius;
      const previouslyInside = geofenceState.current[poi.id] ?? false;

      if (inside && !previouslyInside) {
        const message = `Arrived at ${poi.title}`;
        setLastEvent(`Entered ${poi.title}`);
        Alert.alert('Geofence entered', message);
      }

      if (!inside && previouslyInside) {
        const message = `Leaving ${poi.title}`;
        setLastEvent(`Exited ${poi.title}`);
        Alert.alert('Geofence exited', message);
      }

      geofenceState.current[poi.id] = inside;
    });
  }, []);

  const handleLocationUpdate = useCallback(
    (latitude: number, longitude: number) => {
      const location = { latitude, longitude };
      setCurrentLocation(location);
      setMapRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
      evaluateGeofences(location);

      // Update map location via WebView
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          if (window.updateUserLocation) {
            window.updateUserLocation(${latitude}, ${longitude});
          }
          // Smoothly pan to user location if map is ready
          if (map) {
            map.setView([${latitude}, ${longitude}], map.getZoom(), {
              animate: true,
              duration: 0.3
            });
          }
        `);
      }
    },
    [evaluateGeofences],
  );

  const getCurrentLocation = useCallback(async () => {
    try {
      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;
      handleLocationUpdate(latitude, longitude);
      
      // Center map on user's location immediately
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          if (map && window.setMapCenter) {
            window.setMapCenter(${latitude}, ${longitude});
            map.setZoom(16);
          }
        `);
      }
    } catch (error) {
      console.warn('Error getting current location', error);
    }
  }, [handleLocationUpdate]);

  const startWatchingLocation = useCallback(async () => {
    try {
      // Get current location first
      await getCurrentLocation();
      
      // Then start watching for updates
      expoWatch.current = await ExpoLocation.watchPositionAsync(
        {
          accuracy: ExpoLocation.Accuracy.Highest,
          distanceInterval: 3,
          timeInterval: 2000,
        },
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationUpdate(latitude, longitude);
        },
      );
    } catch (error) {
      console.warn('Location update error', error);
    }
  }, [handleLocationUpdate, getCurrentLocation]);

  const requestPermissions = useCallback(async () => {
    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status === ExpoLocation.PermissionStatus.GRANTED) {
        await startWatchingLocation();
      } else {
        Alert.alert('Permission required', 'Enable location access to use the map features.');
        setLastEvent('Location permission denied');
      }
    } catch (error) {
      console.warn('Permission error', error);
      setLastEvent('Error requesting location');
    }
  }, [startWatchingLocation]);

  useEffect(() => {
    requestPermissions().catch((error) => {
      console.warn('Permission request failed', error);
    });
    return () => {
      if (expoWatch.current) {
        expoWatch.current.remove();
        expoWatch.current = null;
      }
    };
  }, [requestPermissions]);

  const handleZoom = useCallback(
    (direction: 'in' | 'out') => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          if (map) {
            map.${direction === 'in' ? 'zoomIn' : 'zoomOut'}();
          }
        `);
      }
    },
    [],
  );

  const handleRecenter = useCallback(() => {
    if (!currentLocation) return;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (window.setMapCenter) {
          window.setMapCenter(${currentLocation.latitude}, ${currentLocation.longitude});
        }
      `);
    }
  }, [currentLocation]);

  const toggleTheme = useCallback(() => {
    setMapTheme((prev) => {
      const newTheme = prev === 'google' ? 'retro' : 'google';
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          if (window.setMapTheme) {
            window.setMapTheme('${newTheme}');
          }
        `);
      }
      return newTheme;
    });
  }, []);

  const userStatus = useMemo(() => {
    if (!currentLocation) return 'Locating you...';
    const activePoi = pointsOfInterest.find((poi) => geofenceState.current[poi.id]);
    if (activePoi) {
      return `📍 ${activePoi.title}`;
    }
    return `📍 ${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`;
  }, [currentLocation]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  }, [router]);

  const generateMapHTML = () => {
    const markers = pointsOfInterest
      .map(
        (poi) =>
          `{id: '${poi.id}', lat: ${poi.coordinate.latitude}, lng: ${poi.coordinate.longitude}, title: '${poi.title}', description: '${poi.description}', radius: ${poi.radius}}`,
      )
      .join(',');

    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { margin: 0; padding: 0; overflow: hidden; font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    #map { width: 100%; height: 100vh; z-index: 1; }
    .leaflet-container { background: #e5e3df; font-family: 'Roboto', sans-serif; }
    
    /* Google Maps-like popup styling */
    .custom-popup { background: #fff; color: #333; border-radius: 8px; padding: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
    .custom-popup-title { font-size: 16px; font-weight: 500; color: #1a73e8; margin-bottom: 4px; line-height: 1.4; }
    .custom-popup-desc { font-size: 14px; color: #5f6368; line-height: 1.4; }
    .leaflet-popup-content-wrapper { background: #fff; border-radius: 8px; padding: 12px 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
    .leaflet-popup-content { margin: 0; }
    .leaflet-popup-tip { background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
    .leaflet-popup-close-button { color: #5f6368; font-size: 20px; padding: 8px; }
    .leaflet-popup-close-button:hover { color: #1a73e8; }
    
    /* Hide attribution */
    .leaflet-control-attribution { display: none !important; }
    
    /* Google Maps-like marker styling */
    .google-marker {
      position: relative;
      width: 30px;
      height: 30px;
    }
    .google-marker-pin {
      width: 30px;
      height: 30px;
      background: #ea4335;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      position: relative;
    }
    .google-marker-pin::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
    }
    
    .user-location-marker {
      position: relative;
      width: 20px;
      height: 20px;
    }
    .user-location-dot {
      width: 20px;
      height: 20px;
      background: #4285f4;
      border: 3px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .user-location-pulse {
      position: absolute;
      top: -8px;
      left: -8px;
      width: 36px;
      height: 36px;
      border: 2px solid #4285f4;
      border-radius: 50%;
      opacity: 0.4;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(1.5); opacity: 0; }
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    let map;
    let userMarker;
    let markers = [];
    let circles = [];
    let currentTheme = '${mapTheme}';
    const pointsOfInterest = [${markers}];
    const center = [${defaultRegion.latitude}, ${defaultRegion.longitude}];

    // Google Maps-like tile layer (using Esri WorldStreetMap which looks similar)
    const googleLikeTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
      maxZoom: 19
    });

    // Dark theme tile layer
    const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 20
    });

    function initMap() {
      map = L.map('map', {
        center: center,
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true
      });

      // Set initial theme
      if (currentTheme === 'retro') {
        darkTileLayer.addTo(map);
      } else {
        googleLikeTileLayer.addTo(map);
      }

      // Add markers for points of interest (Google Maps red pin style)
      pointsOfInterest.forEach(poi => {
        const googlePinIcon = L.divIcon({
          className: 'google-marker',
          html: \`
            <div class="google-marker-pin"></div>
          \`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        });

        const marker = L.marker([poi.lat, poi.lng], { 
          icon: googlePinIcon,
          riseOnHover: true
        }).addTo(map);
        
        const popupContent = \`
          <div class="custom-popup">
            <div class="custom-popup-title">\${poi.title}</div>
            <div class="custom-popup-desc">\${poi.description}</div>
          </div>
        \`;
        
        marker.bindPopup(popupContent, {
          className: 'custom-popup',
          maxWidth: 280,
          closeButton: true
        });

        markers.push(marker);

        // Add circle for geofence (Google Maps style)
        const circle = L.circle([poi.lat, poi.lng], {
          color: '#1a73e8',
          fillColor: '#1a73e8',
          fillOpacity: 0.1,
          radius: poi.radius,
          weight: 2,
          opacity: 0.5,
          dashArray: '5, 5'
        }).addTo(map);
        
        circles.push(circle);
      });
    }

    window.updateUserLocation = function(lat, lng) {
      const position = [lat, lng];
      
      if (!userMarker) {
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: \`
            <div class="user-location-pulse"></div>
            <div class="user-location-dot"></div>
          \`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        
        userMarker = L.marker(position, { 
          icon: userIcon,
          zIndexOffset: 1000,
          interactive: false
        }).addTo(map);
        
        // Center map on user location when first marker is added
        map.setView(position, 16, {
          animate: true,
          duration: 0.5
        });
      } else {
        userMarker.setLatLng(position);
      }
    };

    window.setMapZoom = function(lat, lng, latDelta, lngDelta) {
      const bounds = [
        [lat - latDelta/2, lng - lngDelta/2],
        [lat + latDelta/2, lng + lngDelta/2]
      ];
      map.fitBounds(bounds, { padding: [20, 20] });
    };

    window.setMapCenter = function(lat, lng) {
      map.setView([lat, lng], map.getZoom(), {
        animate: true,
        duration: 0.5,
        easeLinearity: 0.25
      });
    };

    window.setMapTheme = function(theme) {
      currentTheme = theme;
      map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
      
      if (theme === 'retro') {
        darkTileLayer.addTo(map);
      } else {
        googleLikeTileLayer.addTo(map);
      }
    };

    // Initialize map when page loads
    initMap();
  </script>
</body>
</html>
    `;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Live Listening Map</Text>
            <Text style={styles.subtitle}>{userStatus}</Text>
          </View>
        </View>

        <WebView
          ref={webViewRef}
          source={{ html: generateMapHTML() }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1DB954" />
            </View>
          )}
        />

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleZoom('in')}>
            <Text style={styles.controlText}>＋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleZoom('out')}>
            <Text style={styles.controlText}>－</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.recenter]} onPress={handleRecenter}>
            <Text style={styles.recenterText}>Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.themeButton]} onPress={toggleTheme}>
            <Text style={styles.themeText}>{mapTheme === 'google' ? 'Retro' : 'Google'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventBanner}>
          <Text style={styles.eventText}>{lastEvent}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(0,0,0,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  backIcon: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '600',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#1DB954',
    marginTop: 4,
    fontWeight: '500',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  controls: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    gap: 10,
  },
  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(27,27,31,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  controlText: {
    fontSize: 28,
    color: '#ffffff',
    lineHeight: 32,
    fontWeight: '300',
  },
  recenter: {
    width: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(29,185,84,0.15)',
    borderColor: 'rgba(29,185,84,0.4)',
  },
  recenterText: {
    color: '#1DB954',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  themeButton: {
    width: 96,
    borderRadius: 16,
    backgroundColor: 'rgba(29,185,84,0.1)',
    borderColor: 'rgba(29,185,84,0.3)',
  },
  themeText: {
    color: '#1DB954',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  eventBanner: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(29,185,84,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  eventText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
