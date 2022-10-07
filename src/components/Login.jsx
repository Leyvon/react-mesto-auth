import React from "react";
import { Link, useHistory } from "react-router-dom";
import auth from "../utils/Auth";

const Login = ({handleLogin}) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(userEmail, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        handleLogin();
        history.push('/');
      });
  }

  return (
    <div className="login">
      <h1 className="login__title">
        Вход
      </h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input 
          required
          className="login__input login__input_type_useremail"  
          id="useremail" 
          name="useremail" 
          type="email" 
          minLength="3" 
          maxLength="30"
          placeholder="Email"
          value={userEmail || ''} 
          onChange={handleUserEmailChange} 
        />
        <input 
          required
          className="login__input login__input_type_password" 
          id="password" 
          name="password" 
          type="password" 
          minLength="4" 
          maxLength="30"
          placeholder="Пароль"
          value={password || ''} 
          onChange={handlePasswordChange} 
        />
        <button type="submit" className="login__button-submit">Войти</button>
      </form>
      <div className="login__signup-container">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__link">Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;