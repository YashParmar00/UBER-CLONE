import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

// Container style for the map
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Default fallback location (e.g., New Delhi)
const fallbackCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

// Define libraries outside the component to avoid reloading
const LIBRARIES = ['marker'];

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(fallbackCenter);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Update location every 10 seconds
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    // Function to fetch and update the user's location
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const updatedPosition = { lat: latitude, lng: longitude };
          setCurrentPosition(updatedPosition);

          // Log latitude and longitude to the console
          console.log(`Updated Position: Latitude: ${latitude}, Longitude: ${longitude}`);

          // Move marker to new position
          if (markerRef.current) {
            markerRef.current.position = new window.google.maps.LatLng(latitude, longitude);
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    };

    // Call updateLocation every 10 seconds
    const intervalId = setInterval(updateLocation, 10000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Called when the map is loaded
  const handleMapLoad = (map) => {
    mapRef.current = map;

    // Ensure the AdvancedMarkerElement library is loaded
    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      const { AdvancedMarkerElement } = window.google.maps.marker;

      const marker = new AdvancedMarkerElement({
        map: map,
        position: currentPosition,
        title: 'You are here!',
      });

      markerRef.current = marker;
    } else {
      console.error('AdvancedMarkerElement is not available. Make sure the marker library is loaded.');
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBTUr0ZOPCiBfZc_trOuSn80yqP1eZHM-c" // Your API key
      libraries={LIBRARIES} // Load the marker library
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={handleMapLoad}
        options={{
          mapId: 'd23ccc6265c7f2e8', // Your Map ID
        }}
      >
        {/* Marker is added using the AdvancedMarkerElement class */}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
