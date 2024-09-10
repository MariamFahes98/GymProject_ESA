import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from "../../assets/images/defaultProfile.png";
import { IoMdPersonAdd } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const TrainerTable = () => {
  const [trainers, setTrainers] = useState([]);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [file, setFile] = useState(null); // State to handle file input

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trainers');
      setTrainers(response.data);
    } catch (error) {
      toast.error('Failed to fetch trainers'); // Show error toast
      console.error('Failed to fetch trainers', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/trainers/${id}`);
        setTrainers(trainers.filter(trainer => trainer._id !== id));
        toast.success('Trainer deleted successfully'); // Show success toast
      } catch (error) {
        toast.error('Failed to delete trainer'); // Show error toast
        console.error('Failed to delete trainer', error);
      }
    }
  };

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
    setFormData({ ...trainer });
  };

  const closeEditModal = () => {
    setEditingTrainer(null);
    setFormData({});
    setFile(null); // Reset file state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Handle file input
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    // Custom validation
    if (!formData.firstName || formData.firstName.length < 2) {
      toast.error('First Name must be at least 2 characters long.');
      return;
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      toast.error('Last Name must be at least 2 characters long.');
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
     // Lebanese phone number validation
  if (formData.phoneNumber && !/^(0(1|2|3|4|5|6|7|8|9)-\d{6})$|^(0(3|7|9)\d{6})$/.test(formData.phoneNumber)) {
    toast.error('Please enter a valid Lebanese phone number.');
    return;
  }
    if (!formData.specialties || formData.specialties.length === 0) {
      toast.error('Specialties are required.');
      return;
    }
  
    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('specialties', formData.specialties.join(', '));
    if (file) {
      form.append('imagePath', file); // Ensure this matches your multer fieldname
    }
  
    try {
      const response = editingTrainer
        ? await axios.put(`http://localhost:5000/api/trainers/${formData._id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await axios.post('http://localhost:5000/api/trainers', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      
      setTrainers(prevTrainers =>
        editingTrainer
          ? prevTrainers.map(trainer => trainer._id === formData._id ? response.data : trainer)
          : [...prevTrainers, response.data]
      );
      toast.success(`Trainer ${editingTrainer ? 'updated' : 'added'} successfully`);
      closeEditModal();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Validation error: Please check your input.');
        } else if (error.response.status === 404) {
          toast.error('Trainer not found. Please try again.');
        } else if (error.response.status === 500) {
          toast.error('Server error: Something went wrong on our end.');
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else if (error.request) {
        toast.error('Network error: Please check your internet connection.');
      } else {
        toast.error('Error: Unable to add trainer.');
      }
      console.error('Failed to save trainer', error);
    }
  };
  
  

  const handleAddTrainer = () => {
    setShowAddTrainerModal(true);
  };

  return (
    <div className="p-4 dark:bg-gray-800 h-full">
      <div className='flex justify-between  dark:bg-gray-800'>
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Our Trainers</h2>
        <button
          onClick={handleAddTrainer}
          className="flex bg-custom-gradient text-white py-2 px-4 rounded hover:bg-purple-600 mb-4"
        >
          Add Trainer
          <IoMdPersonAdd className='w-6 h-6 ml-2' />
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md  dark:border-gray-700 dark:bg-gray-800">
        <thead>
          <tr className="w-full bg-custom-gradient border-b border-gray-200 text-left dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <th className="py-3 px-4 text-gray-600">Image</th>
            <th className="py-3 px-4 text-gray-600">Name</th>
            <th className="py-3 px-4 text-gray-600">Email</th>
            <th className="py-3 px-4 text-gray-600">Phone Number</th>
            <th className="py-3 px-4 text-gray-600">Specialties</th>
            
            <th className="py-3 px-4 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map(trainer => (
            <tr key={trainer._id} className="border-b border-gray-200 dark:hover:bg-gray-700">
              <td className="py-3 px-4 dark:text-gray-100">
                {trainer.imagePath ? (
                  <img
                    src={`http://localhost:5000/uploads/trainers/${trainer.imagePath}`} // Ensure this path matches the backend static route
                    alt={`${trainer.firstName} ${trainer.lastName}`}
                    className="w-12 h-12 rounded-full object-cover "
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-gray-600"><img src={defaultImage} alt="default" /></span>
                  </div>
                )}
              </td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                {trainer.firstName} {trainer.lastName}
              </td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{trainer.email}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{trainer.phoneNumber}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{trainer.specialties.join(', ')}</td>
          
              <td className="py-3 px-4 flex dark:text-gray-100">
                <button
                  onClick={() => handleEdit(trainer)}
                  className="bg-custom-gradient text-white py-1 px-2 rounded hover:bg-purple-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trainer._id)}
                  className="bg-purple-400 text-white py-1 px-2 rounded hover:bg-purple-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Trainer Modal */}
      {showAddTrainerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Add Trainer</h2>
            <form onSubmit={handleSave}>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-100">First Name</label>
    <input
      type="text"
      name="firstName"
      value={formData.firstName || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      required
      minLength="2"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-100">Last Name</label>
    <input
      type="text"
      name="lastName"
      value={formData.lastName || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      required
      minLength="2"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-100">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-100">Phone Number</label>
    <input
  type="text"
  name="phoneNumber"
  value={formData.phoneNumber || ''}
  onChange={handleInputChange}
  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
  pattern="0(1|2|3|4|5|6|7|8|9)-\d{6}|0(3|7|9)\d{6}"
  placeholder="e.g., 03-123456"
  required
/>

  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-100">Specialties</label>
    <input
      type="text"
      name="specialties"
      value={formData.specialties ? formData.specialties.join(', ') : ''}
      onChange={e => setFormData(prevState => ({ ...prevState, specialties: e.target.value.split(',').map(s => s.trim()) }))}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-100 ">Image</label>
    <input
      type="file"
      name="image"
      onChange={handleFileChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      accept="image/*" // Accept only image files
    />
  </div>
  <div className="flex justify-end">
    <button
      type="button"
      onClick={() => setShowAddTrainerModal(false)}
      className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-600 mr-2"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-custom-gradient text-white py-1 px-2 rounded hover:bg-blue-600"
    >
      Add
    </button>
  </div>
</form>

          </div>
        </div>
      )}

      {/* Edit Trainer Modal */}
      {editingTrainer && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Edit Trainer</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p- dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Phone Number</label>
                <input
  type="text"
  name="phoneNumber"
  value={formData.phoneNumber || ''}
  onChange={handleInputChange}
  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
  pattern="0(1|2|3|4|5|6|7|8|9)-\d{6}|0(3|7|9)\d{6}"
  placeholder="e.g., 03-123456"
  required
/>

              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Specialties</label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties ? formData.specialties.join(', ') : ''}
                  onChange={e => setFormData(prevState => ({ ...prevState, specialties: e.target.value.split(',').map(s => s.trim()) }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange} // Handle file input
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default TrainerTable;

