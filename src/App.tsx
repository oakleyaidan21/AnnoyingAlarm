import React, { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import MainNavigator from './navigation/MainNavigator';
import { setupComponentThemes } from './rnui/ComponentConfig';
import { setupFoundation } from './rnui/FoundationalConfig';
//@ts-ignore
import ReactNativeAN from 'react-native-alarm-notification';

setupFoundation();
setupComponentThemes();

// for layout animations
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  useEffect(() => {
    ReactNativeAN.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
    }).then(
      data => {
        console.log('RnAlarmNotification.requestPermissions', data);
      },
      data => {
        console.log('RnAlarmNotification.requestPermissions failed', data);
      },
    );
  }, []);

  return (
    <View useSafeArea flex>
      <MainNavigator />
    </View>
  );
};

export default App;
