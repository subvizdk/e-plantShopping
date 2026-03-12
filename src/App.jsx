import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const goHome = () => setCurrentPage('home');
  const goPlants = () => setCurrentPage('plants');
  const goCart = () => setCurrentPage('cart');

  if (currentPage === 'home') {
    return (
      <div className="landing-page">
        <div className="overlay">
          <div className="landing-left">
            <h1>Welcome To Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button onClick={goPlants}>Get Started</button>
          </div>

          <div className="landing-right">
            <AboutUs />
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'cart') {
    return (
      <CartItem
        onHomeClick={goHome}
        onPlantsClick={goPlants}
        onCartClick={goCart}
      />
    );
  }

  return (
    <ProductList
      onHomeClick={goHome}
      onPlantsClick={goPlants}
      onCartClick={goCart}
    />
  );
}

export default App;