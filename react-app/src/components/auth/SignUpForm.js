import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = ({ visible }) => {
  const [errors, setErrors] = useState([]);
  const [reactErrors, setReactErrors] = useState([])
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    let validations = []
    if (!username) {
      validations.push('Please provide a username')
    }
    else if (username.length > 40) {
      validations.push('Username may not be longer than 40 characters')
    }
    if (!email) {
      validations.push('Please provide an email')
    } else if (email.indexOf('@') === -1) {
      validations.push('Please provide a valid email')
    }
    if (email.length > 254) {
      validations.push('Email exceeds character limit')
    }
    if (!password) {
      validations.push('Please enter a password')
    } else if (password.length > 254) {
      validations.push('Password exceeds character limit')
    } else if (!repeatPassword) {
      validations.push('Please enter your password again')
    } else if (password !== repeatPassword) {
      validations.push('Passwords do not match')
    }
    setReactErrors(validations)
  },[username, password, email, repeatPassword])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='signup-form-wrapper'>
      <form onSubmit={onSignUp} id='signup-form'>
      <button type='button' id='close-signup-modal' onClick={() => visible(false)}>X</button>
      <p>Sign Up</p>
        <div id='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
          {reactErrors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
        </div>
          <input
            type='text'
            name='username'
            maxlength={40}
            onChange={updateUsername}
            value={username}
            ></input>
        <div>
          <label>Email</label>
        </div>
          <input
            type='text'
            name='email'
            maxlength={254}
            onChange={updateEmail}
            value={email}
          ></input>
        <div>
          <label>Password</label>
        </div>
          <input
            type='password'
            name='password'
            maxlength={254}
            onChange={updatePassword}
            value={password}
            ></input>
        <div>
          <label>Confirm Password</label>
        </div>
          <input
            type='password'
            name='repeat_password'
            maxlength={254}
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></input>
        <button disabled={!!reactErrors.length} id='signup-submit' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
