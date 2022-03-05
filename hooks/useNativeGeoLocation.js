import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useNativeGeoLocation() {
  const [geo, setGeo] = useState({ latt: 0, long: 0 });
  const [error, setError] = useState(false);
  const [hasPerms, setHasPerms] = useState(false);

  useEffect(() => {
    const getGeoLocationAsync = async () => {
      // ask for perms
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setHasPerms(false);
        return;
      }

      const geo = await Location.getCurrentPositionAsync({});
      setGeo({ latt: geo.coords.latitude, long: geo.coords.longitude });
      setHasPerms(true);
    };

    getGeoLocationAsync();
  }, []);

  return { geo, setGeo, error, setError, hasPerms, setHasPerms };
}
