import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import MainNavigator from './navigation/MainNavigator';
import { setupComponentThemes } from './rnui/ComponentConfig';
import { setupFoundation } from './rnui/FoundationalConfig';

setupFoundation();
setupComponentThemes();

const App = () => {
  return (
    <View useSafeArea center>
      <MainNavigator />
    </View>
  );
};

export default App;
