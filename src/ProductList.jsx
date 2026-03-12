import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsArray = [
  // Aromatic Plants
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
    description: 'A sweet-smelling plant that adds elegance to indoor spaces.',
  },
  {
    category: 'Aromatic Plants',
    name: 'Mint',
    cost: '$10',
    image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=500&q=80',
    description: 'Fresh and fragrant, perfect for kitchens and tea lovers.',
  },
  {
    category: 'Aromatic Plants',
    name: 'Rosemary',
    cost: '$13',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=500&q=80',
    description: 'Aromatic herb with a refreshing scent and culinary use.',
  },
  {
    category: 'Aromatic Plants',
    name: 'Thyme',
    cost: '$11',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
    description: 'Compact herb that adds fragrance and greenery.',
  },
  {
    category: 'Aromatic Plants',
    name: 'Lemon Balm',
    cost: '$14',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=500&q=80',
    description: 'A citrusy herb that brings a bright and uplifting aroma.',
  },

  // Medicinal Plants
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
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=500&q=80',
    description: 'A sacred herb valued for wellness and immunity support.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Chamomile',
    cost: '$16',
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?auto=format&fit=crop&w=500&q=80',
    description: 'Gentle flowering plant often associated with calm and comfort.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Sage',
    cost: '$14',
    image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=500&q=80',
    description: 'An earthy herb known for traditional wellness uses.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Calendula',
    cost: '$17',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=500&q=80',
    description: 'Bright blooms that add color and herbal value.',
  },
  {
    category: 'Medicinal Plants',
    name: 'Echinacea',
    cost: '$19',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=500&q=80',
    description: 'A hardy flowering plant often featured in herbal gardens.',
  },

  // Air Purifying Plants
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
  {
    category: 'Air Purifying Plants',
    name: 'Spider Plant',
    cost: '$12',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    description: 'Great for improving indoor air quality.',
  },
  {
    category: 'Air Purifying Plants',
    name: 'Areca Palm',
    cost: '$22',
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af9e4?auto=format&fit=crop&w=500&q=80',
    description: 'A lush tropical plant that freshens indoor spaces.',
  },
  {
    category: 'Air Purifying Plants',
    name: 'Boston Fern',
    cost: '$16',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80',
    description: 'A classic fern that adds texture and helps purify the air.',
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState(() => {
    const initialState = {};
    plantsArray.forEach((plant) => {
      initialState[plant.name] = false;
    });
    return initialState;
  });

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const categories = [...new Set(plantsArray.map((plant) => plant.category))];

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>

        <div className="nav-links">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onPlantsClick}>Plants</button>
          <button className="cart-button" onClick={onCartClick}>
            <span role="img" aria-label="cart">🛒</span> {totalQuantity}
          </button>
        </div>
      </nav>

      <div className="product-list-container">
        {categories.map((category) => (
          <section key={category} className="category-section">
            <h2 className="category-title">{category}</h2>

            <div className="product-grid">
              {plantsArray
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <div className="plant-card" key={plant.name}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-image"
                    />
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
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;