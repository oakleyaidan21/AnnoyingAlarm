import { Colors, ThemeManager } from 'react-native-ui-lib';

export const setupComponentThemes = () => {
  ThemeManager.setComponentTheme('Text', {
    color: Colors.primaryText,
  });
};
