import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('quantity', productData.quantity);
      formData.append('category', productData.category);
      formData.append('description', productData.description);
      if (file) {
        formData.append('image', file);
      }
  
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Product added successfully!');
      onAddProduct(response.data);
  
      // Add a slight delay before closing the modal
      setTimeout(() => {
        onClose();
      }, 500); // 500ms delay
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error('Invalid input. Please check your data and try again.');
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else if (error.request) {
        toast.error('No response from the server. Please check your connection and try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };
  


  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative dark:border-gray-700 dark:bg-gray-800"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={productData.name || ''}
              onChange={handleInputChange}
              className="mt-1 h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block  pl-2 text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input
              type="text"
              name="price"
              value={productData.price || ''}
              onChange={handleInputChange}
              className="mt-1 h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity || ''}
              onChange={handleInputChange}
              className="mt-1 h-8  pl-2 block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="category"
              value={productData.category || ''}
              onChange={handleInputChange}
              className="mt-1  h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="" disabled>Select a category</option>
              {loading ? (
                <option>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="mt-1  pl-2 block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="mt-1  block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductModal;
