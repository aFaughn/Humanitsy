import React from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({setShowDropdown}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    setShowDropdown(false);
    await dispatch(logout());
    return history.push('/splashpage')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
