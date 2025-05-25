import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import { useCart } from '../contexts/CartContext'; 

const MenuPage = () => {
  const { addToCart } = useCart(); 

  const menuItems = [ 
    {
      id: 1,
      name: 'Volcano Fire Tuna',
      description: 'Spicy ahi tuna, sriracha aioli, crispy onions, jalapeños, and avocado on a bed of volcano rice.',
      price: 16.99,
      image: 'https://via.placeholder.com/400x300/FF6347/FFFFFF?text=Volcano+Tuna', 
      imageAlt: 'Spicy Volcano Fire Tuna Bowl',
      category: 'Spicy',
    },
    {
      id: 2,
      name: 'Zen Garden Tofu',
      description: 'Marinated tofu, edamame, seaweed salad, pickled ginger, carrots, and sesame seeds with a citrus ponzu dressing.',
      price: 14.99,
      image: 'https://via.placeholder.com/400x300/3CB371/FFFFFF?text=Zen+Tofu', 
      imageAlt: 'Vegan Zen Garden Tofu Bowl',
      category: 'Vegetarian',
    },
    {
      id: 3,
      name: 'Sunset Salmon Classic',
      description: 'Fresh salmon, mango salsa, cucumber, red onion, and our classic shoyu sauce over quinoa.',
      price: 15.99,
      image: 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Sunset+Salmon', 
      imageAlt: 'Sunset Salmon Classic Bowl',
      category: 'Signature Bowls',
    },
     {
      id: 4,
      name: 'Island Shrimp Scampi',
      description: 'Garlic butter shrimp, sun-dried tomatoes, edamame, sweet corn, and a sprinkle of parmesan over white rice.',
      price: 17.50,
      image: 'https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=Island+Shrimp', 
      imageAlt: 'Island Shrimp Scampi Bowl',
      category: 'Signature Bowls',
    },
  ];

  const categories = ["All Bowls", "Signature Bowls", "Vegetarian", "Spicy", "New", "Classics", "Limited Time"];

  const handleAddToCart = (item) => {
    const itemToAdd = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image, 
    };
    addToCart(itemToAdd);
    // console.log(`Added ${item.name} to cart.`); // Removed for cleanup
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight">
              Craft Your Perfect Bowl
            </h1>
            <p className="mt-3 sm:mt-4 text-md sm:text-lg lg:text-xl text-gray-600 max-w-xl md:max-w-2xl mx-auto">
              Choose from our signature creations or build your own masterpiece with the freshest ingredients.
            </p>
          </div>

          <div className="mb-8 md:mb-10 lg:mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <Button
                  key={category} // Using category string as key, assuming unique
                  variant={category === "All Bowls" ? "primary" : "outline"}
                  size="medium" 
                  className={`
                    px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm 
                    ${category === "All Bowls" ? 'bg-blue-600 text-white' : 'text-blue-600 border-blue-500 hover:bg-blue-50'}
                    focus:ring-blue-400
                  `}
                  onClick={() => { /* Placeholder for filter logic */ }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image} 
                imageAlt={item.imageAlt}
                title={item.name}
                content={item.description}
              >
                <div className="mt-auto pt-4"> 
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">${item.price.toFixed(2)}</p>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="primary" 
                      size="medium" 
                      className="w-full text-sm sm:text-base" 
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="secondary" size="medium" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm sm:text-base">
                      Customize
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;
