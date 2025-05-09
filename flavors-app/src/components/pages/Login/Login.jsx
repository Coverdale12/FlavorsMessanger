import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Title from '../../typography/Title/Title';
import "./Login.scss";
import { useAuth } from '@context/AuthContext';

export default function Login() {
  const { user, login, isAuthenticated } = useAuth()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');// Используем функцию login из контекста
  const [error, setError] = useState(false);

  const navigate = useNavigate(); // Импортируем useNavigate для перенаправления

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(username, password).then(() => {
      navigate("/")
    }).catch((err) => {
      err.status === 401 && alert("Неправильные логин или пароль!")
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
          You are logged in as <Link to="/account"><span>{user.username}</span></Link>
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