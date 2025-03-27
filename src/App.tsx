import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, RootState } from './redux/store';
import Navigation from './Routes/Navigation';
import { Appearance, SafeAreaView } from 'react-native';
import { useInternet } from './Utils/useInternet';
import NetworkPage from './Components/NetworkPage';
import { setTheme } from './redux/themeSlice';
import { darkTheme, lightTheme } from './themes/colors';


const App = () => {

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const isConnected = useInternet();


  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(setTheme(colorScheme === 'dark'));
    });

    return () => {
      subscription.remove();
    };
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {isConnected ? <Navigation /> : <NetworkPage />}
      {/* <NetworkPage /> */}
    </SafeAreaView>
  );
};

export default App;
