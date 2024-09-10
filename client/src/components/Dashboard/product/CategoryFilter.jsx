import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosAddCircleOutline } from "react-icons/io";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState(['All']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(['All', ...response.data.map(category => category.name)]);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      setCategories([...categories, response.data.name]);
      setNewCategory('');
      setIsModalOpen(false);
      toast.success('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="mb-4 flex justify-between">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Category</label>
      <div className="flex items-center space-x-2">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="mt-1 block border-gray-300 rounded-md shadow-sm w-[200px] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-custom-gradient text-white w-6 h-6 rounded-full hover:bg-purple-600"
        >
          <IoIosAddCircleOutline className='w-6 h-6 '/>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-300">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mt-1  h-8 pl-2 block w-full border-gray-300 rounded-md shadow-sm mb-4 dark:bg-gray-800 dark:text-gray-100 "
              placeholder="Enter category name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 "
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-custom-gradient text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;


