import { Colors, ThemeManager } from 'react-native-ui-lib';

export const setupComponentThemes = () => {
  ThemeManager.setComponentTheme('Text', (props: any, context: any) => {
    // color: Colors.primaryText,
    let style = { color: Colors.primaryText, allowFontScaling: false };
    if (props.bold) {
      Object.assign(style, { fontWeight: 'bold' });
    }
    return style;
  });

  ThemeManager.setComponentTheme('View', (props: any, context: any) => {
    let style = {};
    if (props.paddingd) {
      Object.assign(style, { padding: 10 });
    }
    if (props.radius) {
      Object.assign(style, {
        width: props.radius * 2,
        height: props.radius * 2,
        borderRadius: props.radius,
      });
    }
    return style;
  });
};
