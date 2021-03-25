import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header'
import ToDo from './pages/ToDo'
import './styles/App.scss'

const App = () => {
  return (
      <Router history={history}>
        <Header history={history}/>
        <div style={{marginLeft: '80px'}}>
          <Switch>
            <Route path="/" exact component={ToDo} />
          </Switch>
        </div>
      </Router>
  );
};

export default App;
