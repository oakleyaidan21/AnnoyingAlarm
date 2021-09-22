import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { setupComponentThemes } from './rnui/ComponentConfig';
import { setupFoundation } from './rnui/FoundationalConfig';

setupFoundation();
setupComponentThemes();

const App = () => {
  return (
    <View useSafeArea center>
      <Text>Annoying Alarm!</Text>
    </View>
  );
};

export default App;
