export const getTabBarIconName = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Create':
      return 'add';
    case 'Settings':
      return 'settings';
    default:
      return 'home';
  }
};
