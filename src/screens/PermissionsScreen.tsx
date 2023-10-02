import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { PermissionsContext } from '../context/PermissionContext';

const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext);


  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <Text>PermissionsScreen</Text>
      <Button
        title="Grant Permission"
        onPress={askLocationPermission}
      />
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
