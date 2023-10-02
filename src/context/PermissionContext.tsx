import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, RESULTS, check, request } from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}
export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

const PermissionsProvider = ({ children }: { children: ReactNode; }) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      console.log({ state });
      // if (state !== 'active') return;
      // checkLocationPermission();
    });
  }, []);


  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {

      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permissionStatus === RESULTS.DENIED) {

    }

    setPermissions(prevPermissions => ({
      ...prevPermissions,
      locationStatus: permissionStatus,
    }));

  };
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {

      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permissionStatus === RESULTS.DENIED) {

    }

    setPermissions(prevPermissions => ({
      ...prevPermissions,
      locationStatus: permissionStatus,
    }));
  };


  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;
