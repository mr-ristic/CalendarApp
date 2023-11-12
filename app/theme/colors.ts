const palette: Record<string, string> = {
  neutral100: '#FFFFFF',
  neutral200: '#64748B',
  neutral300: '#475569',
  neutral400: '#1E293B',
  neutral500: '#3D47E8',
  neutral600: '#2C3A5D',
  neutral700: '#0F172A',
  neutral800: '#0D1220',
  neutral900: '#000000',

  primary100: '#AAB4D0',
  primary200: '#7F8CA0',
  primary300: '#556680',
  primary400: '#3D47E8',
  primary500: '#3D47E8',
  primary600: '#312E58',
  primary700: '#334155',

  secondary100: '#94A3B8',
  secondary200: '#9196B9',
  secondary300: '#626894',
  secondary400: '#41476E',
  secondary500: '#1E293B',

  accent100: '#CDD6F4',
  accent200: '#B2BDDB',
  accent300: '#979FC9',
  accent400: '#7C82B8',
  accent500: '#3D47E8',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  warning100: '#FFF2E0',
  warning500: '#F49224',

  overlay20: 'rgba(61, 71, 232, 0.2)',
  overlay50: 'rgba(61, 71, 232, 0.5)',
  overlay70: 'rgba(51, 65, 85, 0.60)'
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: palette.secondary100,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.secondary500,
  /**
   * The default color of the screen body.
   */
  backgroundBody: palette.neutral700,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.neutral100,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  headerBorder: palette.overlay70
};
