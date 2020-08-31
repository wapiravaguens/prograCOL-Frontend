import React from 'react';
import './App.css';

// react-router-dom
import { Switch, Route } from "react-router-dom";

// Components
import Landing from './pages/landing/landing.component';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing}/>
      </Switch>
    </div>
  );
}

export default App;
