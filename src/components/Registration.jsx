import React from "react";
import { Link, useHistory } from "react-router-dom";
import auth from "../utils/Auth";

const Registration = ({handleSetStatusInfo, handleShowInfoOpen}) => {
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
    auth.register(userEmail, password)
      .then((res) => {
        handleSetStatusInfo();
        handleShowInfoOpen();
        localStorage.setItem('id', res.data._id);
        history.push('/sign-in');
      })
      .catch(() => {
        handleShowInfoOpen();
      });
  }

  return (
    <div className="login">
      <h1 className="login__title">
        Регистрация
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
        <button type="submit" className="login__button-submit">Зарегистрироваться</button>
      </form>
      <div className="login__signup-container">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__link">Войти</Link>
      </div>
    </div>
  );
}

export default Registration;