import React from 'react';
import './App.css';

// react-router-dom
import { Switch, Route } from "react-router-dom";

// Components
import Landing from './pages/landing/landing.component';
import Dashboard from './pages/dashboard/dashboard.component';
import Profile from './pages/profile/profile.component';
import Shapes from './pages/shapes/shapes.components';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />;
        <Route exact path="/profile" component={Profile} />;
        <Route exact path="/shapes" component={Shapes} />;
      </Switch>
    </div>
  );
}

export default App;
