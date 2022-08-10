import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
//CSS Import
import { demoLogin } from '../store/session';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const history = useHistory()

  function handleClick(e) {
    e.preventDefault();
    dispatch(demoLogin())
    return history.push('/')
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/splashpage' exact={true} activeClassName='active'>
            IconPlaceHolder
          </NavLink>
        </li>
        {!sessionUser && (
        <div>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <button id={'demo-login'} onClick={handleClick}>Demo Login</button>
          </li>
        </div>
        )}
        {sessionUser && (
          <>
            <li>
              <NavLink to='/products/forms/newproductform' exact={true} activeClassName='active'>
                New Product
              </NavLink>
            </li>
            <li>
              Praise The Sun, {sessionUser.username}
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
