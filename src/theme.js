export default {
  colors: {
    primary: '#5E35B1', // Deep purple
    secondary: '#FF7043', // Orange
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#263238',
    textSecondary: '#78909C',
    border: '#CFD8DC',
    success: '#43A047',
    error: '#E53935',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 34,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      lineHeight: 22,
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
      color: '#718096',
    },
  },
  icons: {
    search: 'search',
    close: 'close-circle',
    location: 'location-on',
    chevronRight: 'chevron-right',
    marker: 'map-marker',
    recent: 'history',
    noResults: 'emoticon-sad-outline',
  },
};
