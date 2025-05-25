import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Card from '../components/Card/Card'; 

const AboutUsPage = () => {
  const teamMembers = [
    {
      id: 1, // Used as key for Card
      name: 'Kai Ohana',
      role: 'Founder & Head Chef',
      bio: 'Kai grew up on the shores of Maui, learning the art of poke from his grandmother. His passion is to bring authentic Hawaiian flavors to every bowl.',
      imageUrl: 'https://via.placeholder.com/300x300/87CEFA/FFFFFF?text=Kai+O.',
      imageAlt: 'Kai Ohana, Founder',
    },
    {
      id: 2,
      name: 'Leilani Mana',
      role: 'Community Manager',
      bio: 'Leilani believes that food brings people together. She’s dedicated to creating a welcoming atmosphere and sharing the spirit of Aloha with every customer.',
      imageUrl: 'https://via.placeholder.com/300x300/98FB98/FFFFFF?text=Leilani+M.',
      imageAlt: 'Leilani Mana, Community Manager',
    },
    {
      id: 3,
      name: 'Noa Kekoa',
      role: 'Sustainability Officer',
      bio: 'Noa is committed to ensuring our ingredients are sourced responsibly and our practices support the health of our oceans and planet.',
      imageUrl: 'https://via.placeholder.com/300x300/F0E68C/FFFFFF?text=Noa+K.',
      imageAlt: 'Noa Kekoa, Sustainability Officer',
    },
  ];

  const values = [
    { title: 'Authentic Flavors', description: 'Inspired by traditional Hawaiian recipes, crafted with genuine ingredients for a true taste of the islands.', icon: '🌿' },
    { title: 'Sustainably Sourced', description: 'We partner with responsible fisheries and local farms to bring you the freshest, most ethical ingredients.', icon: '🌊' },
    { title: 'Community Focused', description: 'Building connections, supporting local initiatives, and creating a welcoming space for everyone to share a meal.', icon: '❤️' },
    { title: 'Peak Freshness', description: 'Ingredients are prepared daily, ensuring every bowl is vibrant, delicious, and packed with nutrients.', icon: '☀️' },
    { title: 'Made With Aloha', description: 'Each bowl is crafted with care, passion, and a genuine desire to share the warmth of Hawaiian hospitality.', icon: '🤙' },
    { title: 'Healthy & Nourishing', description: 'We believe in food that not only tastes good but also makes you feel good, providing a balanced and wholesome meal.', icon: '💪' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow">
        {/* Hero/Banner Section */}
        <section className="relative bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-300 text-white py-20 md:py-32">
          <div className="absolute inset-0 bg-black opacity-30"></div> 
          <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">About Our Poke Haven</h1>
            <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Discover the heart and soul behind the freshest poke bowls in town.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  From Hawaii to You, With Aloha
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Our journey began not in a bustling city, but on the tranquil shores of the Hawaiian islands, where the scent of salt air blends with the aroma of freshly caught fish. It was here, amidst the vibrant culture and the spirit of 'ohana (family), that our founder, Kai, first learned the art of poke from his grandmother. Each bowl was a tapestry of flavors, a testament to the island's bounty, and a symbol of community.
                  </p>
                  <p>
                    Driven by a passion to share these authentic tastes and the warmth of Hawaiian hospitality, "Poke Haven" was born. We envisioned a place where people could not only savor delicious, healthy food but also experience a moment of aloha – a feeling of connection, peace, and well-being.
                  </p>
                  <p>
                    We are committed to honoring the traditions of poke while embracing modern culinary creativity. This means meticulously sourcing the freshest, highest-quality ingredients, from sustainable line-caught tuna to locally grown vegetables, ensuring that every bite is a true taste of paradise.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="rounded-xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://via.placeholder.com/800x600/E0F2F7/333333?text=Hawaiian+Scenery+or+Poke+Making" 
                    alt="Our Story Visual Placeholder" 
                    className="w-full h-auto object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy/Values Section */}
        <section className="py-16 lg:py-24 bg-gray-100">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What We Believe In</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment goes beyond just food. It's about quality, community, and the spirit of Aloha in everything we do.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {values.map(value => ( // Using `values` array for mapping
                <div key={value.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{value.icon}</div> 
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Passionate Team</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Meet the people dedicated to bringing you the best poke experience, filled with passion and the spirit of Aloha.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {teamMembers.map((member) => (
                <Card
                  key={member.id} // Using member.id as key
                  imageUrl={member.imageUrl}
                  imageAlt={member.imageAlt}
                  title={member.name}
                >
                  {/* Content of the card is passed as children */}
                  <div className="px-0 py-0"> 
                    <h4 className="text-md font-semibold text-blue-600 mb-1">{member.role}</h4>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
