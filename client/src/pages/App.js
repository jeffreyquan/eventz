import React, { useEffect } from 'react';
import Register from './Register';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Register />
      </div>
    </Provider>
  );
}

export default App;
