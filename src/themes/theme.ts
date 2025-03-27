import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../themes/colors';

export const useTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};
