import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
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
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
