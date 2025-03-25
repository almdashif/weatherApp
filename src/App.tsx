import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Navigation from 'Routes/Navigation';
import { SafeAreaView } from 'react-native';
import { useTheme } from './themes/theme';


const App = () => {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ backgroundColor: theme.background }}></SafeAreaView>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
