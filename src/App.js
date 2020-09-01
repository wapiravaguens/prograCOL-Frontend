import React from 'react';
import './App.css';

// react-router-dom
import { Switch, Route } from 'react-router-dom';

// Components
import Landing from './pages/landing/landing.component';
import Dashboard from './pages/dashboard/dashboard.component';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/dashboard' component={Dashboard} />;
      </Switch>
    </div>
  );
}

export default App;
