import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header'
import withAuth from './withAuth'
import ToDo from './pages/ToDo'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles/App.scss'

const App = () => {
  return (
      <Router history={history}>
        <Header history={history}/>
        <div style={{marginLeft: '80px'}}>
          <Switch>
            <Route path="/" exact component={withAuth(ToDo)} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
  );
};

export default App;
