import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header({ loggedIn, onClick }) {
  const location = useLocation();
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [loggedIn]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {loggedIn ? (
        <div className="nav">
          <p className="nav__link">{email}</p>
          <Link
            to="/sign-in"
            className="nav__link nav__link_type_exit"
            onClick={onClick}
          >
            Выйти
          </Link>
        </div>
      ) : (
        <div className="nav">
          {location.pathname === "/sign-up" ? (
            <Link to="/sign-in" className="nav__link">
              Войти
            </Link>
          ) : (
            <Link to="/sign-up" className="nav__link">
              Регистрация
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
