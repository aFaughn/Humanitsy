import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({ visible }) => {
  const [errors, setErrors] = useState([]);
  const [reactErrors, setReactErrors] = useState([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  useEffect(() => {
    let validations = []
    if (!email) {
      validations.push('Please enter a valid email')
    } else if (email.indexOf('@') === -1 ) {
      validations.push('Please enter a valid email')
    }
    if (!password) {
      validations.push('Please enter your password')
    }
    setReactErrors(validations)
  }, [email, password])

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='login-form-wrapper'>
      <form onSubmit={onLogin} id='login-form'>
        <button type='button' id='close-login-modal' onClick={() => visible(false)}>X</button>
        <p>Sign In</p>
        <div id='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
        {reactErrors.map((error) => (
          <div key={error}>{error}</div>
        ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
        </div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            />
        <div>
          <label htmlFor='password'>Password</label>
          </div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            />
          <button disabled={!!reactErrors.length} id='login-submit' type='submit'>Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
