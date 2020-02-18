import React, { useEffect } from 'react';
import Register from './Register';
import Login from './Login';

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
        <Login />
      </div>
    </Provider>
  );
}

export default App;
