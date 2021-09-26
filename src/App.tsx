import React from 'react';
import { Platform, SafeAreaView, StatusBar, UIManager } from 'react-native';
import { View } from 'react-native-ui-lib';
import MainNavigator from './navigation/MainNavigator';
import { setupComponentThemes } from './rnui/ComponentConfig';
import { setupFoundation } from './rnui/FoundationalConfig';
import { createChannel } from './utils/NotificationUtils';

setupFoundation();
setupComponentThemes();
createChannel();

// for layout animations
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <MainNavigator />
      </SafeAreaView>
    </>
  );
};

export default App;
