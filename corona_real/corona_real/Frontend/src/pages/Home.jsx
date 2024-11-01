import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al Sistema de Inventarios del Hotel Corona Real</h1>
      <div>
        <Link to="/rooms">
          <button>Gestionar Habitaciones</button>
        </Link>
        <Link to="/products">
          <button>Gestionar Productos</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
