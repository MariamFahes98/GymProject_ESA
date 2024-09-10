import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import CategoryFilter from './CategoryFilter';
import AddProductModal from './AddProductModal';
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from MongoDB using Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Expected an array of products but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
      setProducts(products.map(product =>
        product._id === id ? { ...product, ...response.data } : product
      ));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Attempting to delete product...');
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
        console.log('Product deleted successfully!');
        toast.success('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };
  

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category.name === selectedCategory);

  return (
    <div className=" flex flex-col p-6 min-h-[600px] dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-300">Products</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className=" flex bg-custom-gradient text-white px-4 py-2 rounded hover:bg-purple-600 dark:text-gray-300"
        >
          Add Product <IoIosAddCircleOutline className='w-6 h-6 ml-2'/>
        </button>
      </div>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className='dark:text-gray-300'>No products found.</p>
        )}
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      <ToastContainer />
    </div>
  );
};

export default Product;

