import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import { Link } from 'react-router-dom'; 

const LandingPage = () => {
  const featuredItems = [
    { imageUrl: "https://via.placeholder.com/400x300/ADD8E6/000000?text=Classic+Ahi", title: "Classic Ahi Tuna", content: "Ahi tuna, avocado, edamame, cucumber, shoyu sauce.", price: "$14.99", id: "feat1" },
    { imageUrl: "https://via.placeholder.com/400x300/90EE90/000000?text=Spicy+Salmon", title: "Spicy Salmon", content: "Salmon, spicy mayo, jalapeños, mango salsa, crispy onions.", price: "$15.99", id: "feat2" },
    { imageUrl: "https://via.placeholder.com/400x300/FFB6C1/000000?text=Vegan+Tofu", title: "Vegan Tofu Delight", content: "Organic tofu, mixed greens, corn, seaweed salad, ginger-lime.", price: "$13.99", id: "feat3" },
  ];

  const testimonials = [
    { quote: "The freshest poke I've had outside of Hawaii! Absolutely delicious.", author: "Sarah L.", id: "test1" },
    { quote: "I love how customizable the bowls are. The staff is super friendly too!", author: "Mike P.", id: "test2" },
    { quote: "Amazing vegan options! The Tofu Delight is packed with flavor.", author: "Jessica B.", id: "test3" },
  ];
  
  const whyChooseUsPoints = [
    { text: "Freshest Ingredients: Sourced daily for peak flavor.", id: "why1" },
    { text: "Authentic Hawaiian Flavors: Traditional recipes, modern twist.", id: "why2" },
    { text: "Customizable Bowls: Build your perfect poke bowl.", id: "why3" }
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <header className="relative flex items-center justify-center h-screen min-h-[500px] mb-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 opacity-80"></div>
        <div className="relative z-10 text-center p-4 sm:p-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 shadow-md">
            Fresh Hawaiian Poke Bowls
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 md:mb-10 font-light max-w-xl md:max-w-2xl mx-auto">
            Experience authentic island flavors with the freshest ingredients, crafted your way.
          </p>
          <Button 
            as={Link}
            to="/menu"
            variant="primary" 
            size="large" 
            className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 px-8 py-3 sm:px-10 sm:py-4"
          >
            Explore Menu
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-12 md:py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Aloha! Our Story</h2>
              <p className="text-md sm:text-lg text-gray-600 leading-relaxed">
                Our journey began with a passion for the vibrant flavors of Hawaii and a dream to share them with the world. We believe in using only the freshest, sustainably sourced ingredients to create poke bowls that are not only delicious but also nourishing.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
              <div className="md:w-1/2">
                <div className="bg-gray-200 rounded-xl shadow-lg w-full h-64 sm:h-80 flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                  {whyChooseUsPoints.map((point) => (
                    <li key={point.id} className="flex items-start">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      <span>{point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Fan Favorites</h2>
              <p className="text-md sm:text-lg text-gray-600 leading-relaxed">
                Discover the poke bowls our customers can't get enough of. Each one is a taste of paradise!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredItems.map(item => (
                <Card
                  key={item.id}
                  imageUrl={item.imageUrl}
                  imageAlt={item.title}
                  title={item.title}
                  content={item.content}
                >
                  <div className="mt-4">
                    <p className="text-xl font-semibold text-gray-800 mb-3">{item.price}</p>
                    <Button as={Link} to="/menu" variant="primary" size="medium" className="w-full">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-gray-100 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <p className="text-gray-600 italic mb-4 text-sm sm:text-base">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-800">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
