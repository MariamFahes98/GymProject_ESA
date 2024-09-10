import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    image: '',
    category: '',
    description:''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch product and categories data
  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:5000/api/products/${id}`);
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        
        // Ensure the selected category is correctly set
        setFormData({
          ...productResponse.data,
          category: productResponse.data.category._id, // Assuming category is populated in product data
        });
        
        setCategories(categoriesResponse.data);
        
        // Set image preview URL
        setImagePreview(`http://localhost:5000/uploads/products/${productResponse.data.image}`);
      } catch (error) {
        console.error('Error fetching product or categories:', error);
      }
    };

    fetchProductAndCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.append('name', formData.name);
    updatedProduct.append('price', formData.price);
    updatedProduct.append('quantity', formData.quantity);
    updatedProduct.append('category', formData.category);
    updatedProduct.append('description', formData.description);
    if (formData.image) {
      updatedProduct.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product updated successfully!');
      setTimeout(() => {
        navigate('/dashboard/product'); // Navigate to the products page after showing the toast
      }, 1500); // Adjust the delay to your preference
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <div className='dark:bg-gray-800'>
    <div className="max-w-lg mx-auto p-6 w-full bg-white shadow-lg rounded-lg  dark:bg-gray-800">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-300">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className='flex space-x-4'>
        <div >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300 ">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1  h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
            required
          />
        </div>
        
     
        
        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1   h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
            required
          />
        </div>
            {/* Image Upload */}
            <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
            accept="image/*"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md shadow-sm" />
          )}
        </div>
        </div>
        <div>
        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1  h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
            required
          />
        </div>
        
        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1  pl-2 block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
    
        </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1   pl-2 block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
            rows="3"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-custom-gradient text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProduct;

