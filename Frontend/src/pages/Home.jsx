import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al Sistema de Inventarios del Hotel Corona Real</h1>
      <div className="button-grid">
        <Link to="/rooms">
          <button className="styled-button">Gestionar Habitaciones</button>
        </Link>
        <Link to="/products">
          <button className="styled-button">Gestionar Productos</button>
        </Link>
        <Link to="/wallets">
          <button className="styled-button">Gestionar Billeteras</button>
        </Link>
        <Link to="/person">
          <button className="styled-button">Gestionar Personas</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
