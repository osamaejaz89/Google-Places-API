import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
