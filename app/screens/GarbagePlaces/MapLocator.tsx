import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Linking } from 'react-native';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native-paper';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get("window");
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;
const INITIAL_LAT = 7.8731;
const INITIAL_LNG = 80.7718;
const INITIAL_POSITION = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapLocator = ({ route }) => {
  const { address } = route.params;  // Access address from route params
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const map = useRef<MapView | null>(null);

  
  const searchPlaces = async () => {
    if (!address.trim().length) return;

    setLoading(true);  // Start loading indicator

    const googleApiUrl = "https://maps.googleapis.com/maps/api/place/textSearch/json";
    const input = address.trim();
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=2000`;
    const url = `${googleApiUrl}?query=${input}&location=${location}&key=AIzaSyADfLlJvc3q9pNkqlb9HbMAQWpW3d2kS90`;

    try {
      const resp = await fetch(url);
      const json = await resp.json();

      if (json && json.results) {
        const coords: LatLng[] = [];
        for (const item of json.results) {
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
        }
        setResults(json.results);
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
            animated: true,
          });
        }
      }
    } catch (e) {
      console.error(e);
      alert("Failed to retrieve locations. Please try again.");
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  const openInGoogleMaps = () => {
    if (address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));
    } else {
      alert("No address provided to open in Google Maps.");
    }
  };

  if (!address) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Address not provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {results.length ? results.map((item, i) => {
          const coord: LatLng = {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          };
          return (
            <Marker
              key={`search-item-${i}`}
              coordinate={coord}
              title={item.name}
              description=''
            />
          );
        }) : null}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBoxField}
          value={address}
          editable={false}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={searchPlaces}>
          <Text style={styles.buttonLabel}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={openInGoogleMaps}>
          <Text style={styles.buttonLabel}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default MapLocator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBox: {
    position: 'absolute',
    width: '90%',
    borderRadius: 8,
    borderColor: '#aaa',
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    marginTop: 60,
  },
  searchBoxField: {
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#26f',
    borderRadius: 8,
    marginTop: 8,
  },
  buttonLabel: {
    fontSize: 18,
    color: 'white',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
