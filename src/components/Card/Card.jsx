import React from 'react';

const Card = ({ imageUrl, title, content, imageAlt = 'Card image' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt={imageAlt} />
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        )}
        {content && (
          <p className="text-gray-600 text-sm">
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
