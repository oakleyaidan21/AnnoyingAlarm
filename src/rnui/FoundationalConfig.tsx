import { Colors } from 'react-native-ui-lib';

export const setupFoundation = () => {
  Colors.loadColors({
    primaryText: '#000000',
    focusedIcon: '#4ae0ac',
    unfocusedIcon: 'grey',
  });
};
