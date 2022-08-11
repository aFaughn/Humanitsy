import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { demoLogin } from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'

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
      <ul id='nav-elements'>
        <li>
          <NavLink to='/splashpage' exact={true} activeClassName='active'>
            IconPlaceHolder
          </NavLink>
        </li>
        {!sessionUser && (
        <div>
          <li>
            <div className='navButton'>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          </li>
          <li>
            <button id={'demo-login'} onClick={handleClick}>Demo Login</button>
          </li>
        </div>
        )}
        {sessionUser && (
          <>
            <li>
              <div className='navButton'>
                <NavLink to='/products/forms/newproductform' exact={true} activeClassName='active'>
                  New Product
                </NavLink>
              </div>
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
