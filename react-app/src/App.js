import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import EditReview from './components/reviews/ReviewEdit'
import { authenticate } from './store/session';

import MostRecentProducts from './components/products/MostRecentProducts.js';
import ProductDetails from './components/products/ProductDetails';
import NewProductForm from './components/products/NewProductForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <MostRecentProducts />
        </Route>
        <Route path='/products/:productId' exact={true}>
          <ProductDetails/>
        </Route>
        <ProtectedRoute path='/products/forms/newproductform' exact={true}>
          <NewProductForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/edit/:reviewId'>
          <EditReview />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
