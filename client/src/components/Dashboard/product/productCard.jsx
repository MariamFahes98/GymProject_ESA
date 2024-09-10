import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
   const imageUrl = `http://localhost:5000/uploads/products/${product.image}`

  return (
    <div className="bg-white border rounded-md shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.name} className="w-full h-32" />
      <div className="p-4">
        <h2 className="text-lg font-semibold dark:text-gray-300">{product.name}</h2>
        <p className="text-gray-500 dark:text-gray-300">Price: ${product.price}</p>
        <p className="text-gray-500 dark:text-gray-300">Quantity: {product.quantity}</p>
        <p className="text-gray-500 dark:text-gray-300">Category: {product.category?.name || product.category}</p> {/* Ensure you're accessing the correct property */}
        <div className="flex space-x-2 mt-4">
          <Link to={`/dashboard/editproduct/${product._id}`} className="bg-custom-gradient text-white px-4 py-2 rounded hover:bg-purple-600">
            Edit
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
