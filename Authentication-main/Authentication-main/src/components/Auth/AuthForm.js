import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null); 
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    try {
      const url = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAclndL_CUBso12JBTmsGUFUOUpe1mWJ38
`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAclndL_CUBso12JBTmsGUFUOUpe1mWJ38
`;
  
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
  
      
      console.log('Login successful! ID Token:', data.idToken);
  
    } catch (err) {
      // Show error alert 
      alert(err.message || 'Authentication failed!');
      setError(err.message);
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
        {error && <p className={classes.error}>{error}</p>}
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