import React, { useState } from 'react';
import './ShopByCategory.css';

/**
 * ShopByCategory Component
 * 
 * Features:
 * - Click on category cards to filter products
 * - Visual "Active" badge on selected category
 * - "All Products" button to reset filter
 * - Product count display
 * - Responsive grid layout
 * - Smooth transitions and hover effects
 * 
 * Integration:
 * 1. Import and use in your main App or HomePage component:
 *    import ShopByCategory from './components/ShopByCategory';
 *    <ShopByCategory />
 * 
 * 2. To connect to your backend/API:
 *    - Replace the allProducts array with API call in useEffect
 *    - Update handleCategoryClick to fetch products from backend
 */

const ShopByCategory = ({ onProductSelect = null, apiEndpoint = null }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Category data
  const categories = [
    {
      id: 'wellness',
      name: 'Wellness',
      icon: '💪',
      description: 'Supplements & wellness products'
    },
    {
      id: 'firstaid',
      name: 'First Aid',
      icon: '🏥',
      description: 'First aid supplies'
    },
    {
      id: 'vitamins',
      name: 'Vitamins',
      icon: '💊',
      description: 'Vitamins & minerals'
    },
    {
      id: 'herbal',
      name: 'Herbal',
      icon: '🌿',
      description: 'Herbal remedies'
    },
    {
      id: 'babycare',
      name: 'Baby Care',
      icon: '👶',
      description: 'Baby care products'
    },
    {
      id: 'coldflu',
      name: 'Cold & Flu',
      icon: '🤒',
      description: 'Cold & flu relief'
    }
  ];

  // Sample product data - REPLACE WITH YOUR ACTUAL DATA
  const allProducts = [
    { id: 1, name: 'Multivitamin Plus', category: 'vitamins', price: 12.99, image: '💊' },
    { id: 2, name: 'Vitamin C 1000mg', category: 'vitamins', price: 8.99, image: '💊' },
    { id: 3, name: 'Vitamin D3', category: 'vitamins', price: 14.99, image: '💊' },
    { id: 4, name: 'Protein Powder', category: 'wellness', price: 24.99, image: '💪' },
    { id: 5, name: 'Energy Boost', category: 'wellness', price: 18.99, image: '💪' },
    { id: 6, name: 'Ginger Tea', category: 'herbal', price: 6.99, image: '🌿' },
    { id: 7, name: 'Chamomile Tea', category: 'herbal', price: 7.99, image: '🌿' },
    { id: 8, name: 'Echinacea Extract', category: 'herbal', price: 11.99, image: '🌿' },
    { id: 9, name: 'Bandages Assorted', category: 'firstaid', price: 4.99, image: '🏥' },
    { id: 10, name: 'First Aid Kit', category: 'firstaid', price: 19.99, image: '🏥' },
    { id: 11, name: 'Antiseptic Spray', category: 'firstaid', price: 5.99, image: '🏥' },
    { id: 12, name: 'Baby Lotion', category: 'babycare', price: 9.99, image: '👶' },
    { id: 13, name: 'Baby Shampoo', category: 'babycare', price: 8.99, image: '👶' },
    { id: 14, name: 'Diaper Rash Cream', category: 'babycare', price: 7.99, image: '👶' },
    { id: 15, name: 'Cough Syrup', category: 'coldflu', price: 9.99, image: '🤒' },
    { id: 16, name: 'Throat Lozenges', category: 'coldflu', price: 4.99, image: '🤒' },
    { id: 17, name: 'Decongestant Tablets', category: 'coldflu', price: 6.99, image: '🤒' }
  ];

  /**
   * Fetch products from API (optional)
   */
  const fetchProductsByCategory = async (categoryId) => {
    if (!apiEndpoint) {
      const filtered = allProducts.filter(product => product.category === categoryId);
      setFilteredProducts(filtered);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${apiEndpoint}?category=${categoryId}`);
      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      const filtered = allProducts.filter(product => product.category === categoryId);
      setFilteredProducts(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle category click - filters products
   */
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    fetchProductsByCategory(categoryId);
  };

  /**
   * Handle "All Products" click - resets filter
   */
  const handleShowAll = () => {
    setActiveCategory(null);
    setFilteredProducts([]);
  };

  /**
   * Handle product selection
   */
  const handleProductSelect = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  const productsToDisplay = activeCategory ? filteredProducts : allProducts;
  const categoryName = activeCategory 
    ? categories.find(cat => cat.id === activeCategory)?.name 
    : 'All Products';

  return (
    <div className="shop-by-category">
      <div className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        
        <div className="categories-container">
          {/* All Products Button */}
          <button
            className={`category-card all-products-btn ${!activeCategory ? 'active' : ''}`}
            onClick={handleShowAll}
            aria-pressed={!activeCategory}
          >
            <span className="category-icon">🛍️</span>
            <span className="category-name">All Products</span>
            {!activeCategory && <span className="active-badge">Active</span>}
          </button>

          {/* Category Cards */}
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              aria-pressed={activeCategory === category.id}
              title={category.description}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              {activeCategory === category.id && <span className="active-badge">Active</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="product-grid-section">
        <div className="grid-header">
          <h3 className="grid-title">{categoryName}</h3>
          <span className="product-count">
            {productsToDisplay.length} product{productsToDisplay.length !== 1 ? 's' : ''}
          </span>
        </div>

        {isLoading ? (
          <div className="loading">
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.image}</div>
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleProductSelect(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
