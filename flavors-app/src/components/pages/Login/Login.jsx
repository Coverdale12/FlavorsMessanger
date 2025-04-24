import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';
import Title from '../../typography/Title/Title';
import "./Login.scss";
import { Link } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Используем функцию login из контекста
  const navigate = useNavigate(); // Импортируем useNavigate для перенаправления

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(username, password).then(() => {
      navigate("/")
    }).catch((err) => {
      alert("Неправильный логин или пароль")
    })
  };

  return (
    <div className="login">
      <img src="src/assets/icons/global/logo-flav-full.svg" width="400" height="175" alt="flavors" className="login__logo" />
      <Title tag="1">Flavors login</Title>
      <form onSubmit={handleSubmit} className='login__form' data-js-form="">
        <input
          type="text"
          placeholder="Name or email or phone number"
          className="login__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isAuthenticated && <p className="login__paragrapth">
          You are logged in as <Link to="/account"><span>{JSON.parse(localStorage.getItem("user_data")).username}</span></Link>
        </p>}
        <button type="submit" className="login__button">Login</button>
        <p className="login__paragrapth">
          Forgot your
          <Link to="/messages">
            <span>
              password
            </span>
          </Link> or register
          <Link to="/messages">
            <span>
              new account?
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}