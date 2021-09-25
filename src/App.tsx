import React from 'react';
import { Platform, StatusBar, UIManager } from 'react-native';
import { View } from 'react-native-ui-lib';
import MainNavigator from './navigation/MainNavigator';
import { setupComponentThemes } from './rnui/ComponentConfig';
import { setupFoundation } from './rnui/FoundationalConfig';

setupFoundation();
setupComponentThemes();

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
      <View useSafeArea flex>
        <MainNavigator />
      </View>
    </>
  );
};

export default App;
