import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Riview from './components/Riview/Riview';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1>email: {loggedInUser.email}</h1> 
      <Router>
        <Header/>
        <Switch>
          <Route path="/shop">
            <Shop/>
          </Route>

          <Route path="/review">
            <Riview></Riview>
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>


          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path ="/productKey/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
