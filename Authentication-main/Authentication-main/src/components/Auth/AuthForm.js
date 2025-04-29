import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const url = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAclndL_CUBso12JBTmsGUFUOUpe1mWJ38`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAclndL_CUBso12JBTmsGUFUOUpe1mWJ38`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Authentication failed!');
      }

      // Set token with 5-minute expiration (300000ms)
      authCtx.login(data.idToken, 300000);
      history.replace('/');

    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          )}
          {!isLoading ? (
            <button type='submit'>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          ) : (
            <div className={classes.spinner}></div>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;