import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//pages
import MemePage from './pages/MemePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/memes' component={MemePage} />
        <Route exact path='/404' component={NotFoundPage} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
