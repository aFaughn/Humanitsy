import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EditReview from './components/reviews/ReviewEdit'
import { authenticate } from './store/session';

import MostRecentProducts from './components/products/MostRecentProducts.js';
import ProductDetails from './components/products/ProductDetails';
import NewProductForm from './components/products/NewProductForm';
import SplashPage from './components/SplashPage';
import ViewCart from './components/cart/ViewCart';

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
        <Route path='/splashpage'>
          <SplashPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <MostRecentProducts />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId' exact={true}>
          <ProductDetails/>
        </ProtectedRoute>
        <ProtectedRoute path='/products/forms/newproductform' exact={true}>
          <NewProductForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/cart'>
          <ViewCart/>
        </ProtectedRoute>
        <ProtectedRoute path='/edit/:reviewId'>
          <EditReview />
        </ProtectedRoute>
        <Route>
          <div>
            <div id='bad_page'>
            <h1>404: Mimic URL</h1>
            <p>That url didn't work, here's a cute kitty!</p>
            <img src='https://i.imgur.com/ySXQFn3.jpg' alt='404'></img>
            </div>
          </div>

        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
