import React from 'react';

const Wishlist = ({ items }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full"> {/* Block container with reduced width */}
      {/* Wishlist header with "Wishlist1" and "+" button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Wishlist1</h2>
        <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">+</button>
      </div>

      {/* Wishlist items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"> {/* Each item block */}
            {/* Logo and item name */}
            <div className="flex items-center">
              <img src={item.logo} alt={`${item.item} logo`} className="w-10 h-10 mr-4" /> {/* Company logo */}
              <span className="text-lg font-semibold text-white">{item.item}</span>
            </div>
            {/* Item price */}
            <span className="text-lg text-gray-400">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
