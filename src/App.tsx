import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Navigation from 'Routes/Navigation';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
