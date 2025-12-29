import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  // Request permission
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission denied');
    return;
  }

  // Get current location
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  console.log('Latitude:', location.coords.latitude);
  console.log('Longitude:', location.coords.longitude);
  return getAddress(location.coords.latitude,location.coords.longitude)
};


const getAddress = async (lat, lng) => {
    const address = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng,
    });
  
    console.log(address[0]);
  };
  