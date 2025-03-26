import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Navigation from 'Routes/Navigation';
import { SafeAreaView } from 'react-native';
import { useTheme } from './themes/theme';
import { useInternet } from './Utils/useInternet';
import NetworkPage from 'Components/NetworkPage';


const App = () => {
  const theme = useTheme();
  const isConnected = useInternet();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ backgroundColor: theme.background }}></SafeAreaView>
       {isConnected ? <Navigation /> : <NetworkPage />}
      </PersistGate>
    </Provider>
  );
};

export default App;
