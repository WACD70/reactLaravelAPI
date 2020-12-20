
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'

import Login from './Login/login.js';

const App = () => {

  return (
    <BrowserRouter>
      <Route path='/' exact component={Login} />

      {/* <Route path='/' render={Login} /> */}
      <Route path='/another'>
        {
          ({ match }) => {
            if (!match) return null;
            return (
              <Login />
            )
          }
        }
      </Route>
    </BrowserRouter>
  )
}

export default App;


/*props para Route {

  exact
  strict
  sensitive : lee capitales

} */
