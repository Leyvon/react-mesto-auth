import React from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

const Login = ({ submit }) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(values.email, values.password);
  };

  React.useEffect(() => {
    setValues({ email: "", password: "" });
  }, []);

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          className="login__input login__input_type_email"
          id="email"
          name="email"
          type="email"
          minLength="3"
          maxLength="30"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
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
          value={values.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="login__button-submit">
          Войти
        </button>
      </form>
      <div className="login__signup-container">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__link">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default Login;
