// Base color palette
const BASE_COLORS = {
  purple: '#5E35B1',
  orange: '#FF7043',
  white: '#FFFFFF',
  gray50: '#FAFAFA',
  gray800: '#263238',
  gray500: '#78909C',
  gray300: '#CFD8DC',
  green: '#43A047',
  red: '#E53935',
  black: '#000000',
  blueGray400: '#718096',
};

// Semantic color names
const COLORS = {
  primary: BASE_COLORS.purple,
  secondary: BASE_COLORS.orange,
  background: BASE_COLORS.gray50,
  card: BASE_COLORS.white,
  text: BASE_COLORS.gray800,
  textSecondary: BASE_COLORS.gray500,
  border: BASE_COLORS.gray300,
  success: BASE_COLORS.green,
  error: BASE_COLORS.red,
  shadow: BASE_COLORS.black,
  captionText: BASE_COLORS.blueGray400,
};

// Spacing scale
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  get horizontalPadding() {
    return this.md;
  },
  get verticalPadding() {
    return this.sm;
  },
};

// Border radius scale
const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  circle: 9999,
};

// Shadow presets
const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
};

// Typography system
const TYPOGRAPHY = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    color: COLORS.text,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.text,
  },
  bodyBold: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: COLORS.text,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.captionText,
  },
};

// Icon set
const ICONS = {
  search: 'search',
  close: 'close-circle',
  location: 'location-on',
  chevronRight: 'chevron-right',
  marker: 'map-marker',
  recent: 'history',
  noResults: 'emoticon-sad-outline',
  // Additional icons can be added here
};

// Complete theme export
const theme = {
  colors: COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  typography: TYPOGRAPHY,
  icons: ICONS,
  // Helper functions
  getSpacing: (multiplier = 1) => SPACING.md * multiplier,
};

export default theme;
