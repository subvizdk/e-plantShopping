import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsArray = [
  {
    category: 'Aromatic Plants',
    name: 'Lavender',
    cost: '$15',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=500&q=80',
    description: 'Known for its calming fragrance and beautiful purple flowers.',
  },
  {
    category: 'Aromatic Plants',
    name: 'Jasmine',
    cost: '$18',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=500&q=80',
    description: 'A sweet-smelling plant that adds elegance to any indoor space.',
  },
  {
    category: 'Aromatic Plants',
    name: 'Mint',
    cost: '$10',
    image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=500&q=80',
    description: 'Fresh, fragrant, and useful in teas and cooking.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Aloe Vera',
    cost: '$20',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
    description: 'Popular for its soothing gel and easy maintenance.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Tulsi',
    cost: '$12',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    description: 'A sacred herb valued for wellness and immunity support.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Spider Plant',
    cost: '$12',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    description: 'Great for improving indoor air quality.',
  },
  {
    category: 'Air Purifying Plants',
    name: 'Snake Plant',
    cost: '$15',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5c54?auto=format&fit=crop&w=500&q=80',
    description: 'Produces oxygen at night, improving air quality.',
  },
  {
    category: 'Air Purifying Plants',
    name: 'Peace Lily',
    cost: '$18',
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=500&q=80',
    description: 'Elegant plant that helps remove toxins from the air.',
  },
  {
    category: 'Air Purifying Plants',
    name: 'Pothos',
    cost: '$14',
    image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=500&q=80',
    description: 'A hardy trailing plant perfect for beginners.',
  },
];

function ProductList({ onAddToCart, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));

    if (onAddToCart) {
      onAddToCart(plant);
    }
  };

  const categories = [...new Set(plantsArray.map((plant) => plant.category))];

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => window.location.reload()}>
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>

        <div className="nav-links">
          <button className="nav-link">Plants</button>
          <button className="cart-button" onClick={onCartClick}>
            Cart ({totalQuantity})
          </button>
        </div>
      </nav>

      <div className="product-list-container">
        {categories.map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>

            <div className="product-grid">
              {plantsArray
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <div className="plant-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p className="plant-cost">{plant.cost}</p>
                    <p className="plant-description">{plant.description}</p>

                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;