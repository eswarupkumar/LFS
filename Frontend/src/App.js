import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Feed from './Components/Feed'
// import NotFound from './Components/NotFound'
import PrivateRoute from './Components/privateroute';
import Home from './Components/Home';
import ItemPage from './Components/ItemPage';
// import Feed from './Components/Feed'

function App()
{
  const name='Swarup K'
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/sign-up' component={Signup} exact/>
        <Route path='/log-in' component={Login} />
        <PrivateRoute path='/feed' component={Feed}  />
        <Route path='/:item' component={ItemPage} exact />
        {/* <Route path='*' component={NotFound}/> */}
      </Switch>
    </Router>
    {/* <Signup/> */}
    </>

  )
}

export default App