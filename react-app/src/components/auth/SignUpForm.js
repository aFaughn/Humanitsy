import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = ({ visible }) => {
  const [errors, setErrors] = useState([]);
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
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
          <label>User Name</label>
        </div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            ></input>
        <div>
          <label>Email</label>
        </div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        <div>
          <label>Password</label>
        </div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            ></input>
        <div>
          <label>Repeat Password</label>
        </div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></input>
        <button id='signup-submit' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
