import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassTable = () => {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [daysOptions] = useState([
    "Mon-Wed", "Tues-Thur", "Fri-Sat"
  ]);
  const [durationOptions] = useState([
    "30", "45", "60", "90"
  ]);
  const [timeOptions] = useState([
    "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm",
    "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm",
    "6:00 pm", "7:00 pm", "8:00 pm"
  ]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/class')
      .then(response => setClasses(response.data))
      .catch(error => toast.error('Failed to fetch classes'));
    
    axios.get('http://localhost:5000/api/trainers')
      .then(response => setTrainers(response.data))
      .catch(error => toast.error('Failed to fetch trainers'));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      axios.delete(`http://localhost:5000/api/class/${id}`)
        .then(() => {
          setClasses(classes.filter(cls => cls._id !== id));
          toast.success('Class deleted successfully');
        })
        .catch(error => toast.error('Failed to delete class'));
    }
  };
  
  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({ ...cls });
  };

  const closeEditModal = () => {
    setEditingClass(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/class/${formData._id}`, formData)
      .then(response => {
        setClasses(classes.map(cls => cls._id === formData._id ? response.data : cls));
        closeEditModal();
        toast.success('Class updated successfully');
      })
      .catch(error => toast.error('Failed to update class'));
  };
  
  const handleAddClass = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/class', formData)
      .then(response => {
        setClasses([...classes, response.data]);
        setShowAddClassModal(false);
        setFormData({});
        toast.success('Class added successfully');
      })
      .catch(error => toast.error('Failed to add class'));
  };

  return (
    <div className="p-4 dark:bg-gray-800 h-full">
      <ToastContainer />
      <div className='flex justify-between dark:bg-gray-800'>
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">OUR CLASSES</h2>
        <button
          onClick={() => setShowAddClassModal(true)}
          className="flex bg-custom-gradient text-white py-2 px-4 rounded hover:bg-purple-600 mb-4"
        >
          Add Class <IoIosAddCircleOutline className='w-6 h-6 ml-2'/>
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md  dark:border-gray-700 dark:bg-gray-800">
        <thead>
          <tr className="w-full bg-custom-gradient border-b border-gray-200 text-left dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <th className="py-3 px-4 text-gray-600">Class Name</th>
            <th className="py-3 px-4 text-gray-600">Trainer</th>
            <th className="py-3 px-4 text-gray-600">Days</th>
            <th className="py-3 px-4 text-gray-600">Time</th>
            <th className="py-3 px-4 text-gray-600">Duration</th>
            <th className="py-3 px-4 text-gray-600">Capacity</th>
            <th className="py-3 px-4 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(cls => (
            <tr key={cls._id} className="border-b border-gray-200 dark:hover:bg-gray-700">
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{cls.name}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                {cls.trainer ? `${cls.trainer.firstName} ${cls.trainer.lastName}` : 'No Trainer'}
              </td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100 ">{cls.days.join(', ')}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{cls.time}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{cls.duration} min</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{cls.capacity}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleEdit(cls)}
                  className="bg-custom-gradient text-white py-1 px-2 rounded hover:bg-purple-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="bg-purple-400 text-white py-1 px-2 rounded hover:bg-purple-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3  dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4  dark:text-gray-100">Add Class</h2>
            <form onSubmit={handleAddClass}>
              <div className="mb-4">
                <label className="block text-gray-700  dark:text-gray-100">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder='Add the name of the class'
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700  dark:text-gray-100">Trainer</label>
                <select
                  name="trainer"
                  value={formData.trainer || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2  dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Trainer</option>
                  {trainers.map(trainer => (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.firstName} {trainer.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Days</label>
                <select
                  name="days"
                  value={formData.days ? formData.days.join(', ') : ''}
                  onChange={e => setFormData(prevState => ({ ...prevState, days: e.target.value.split(',').map(day => day.trim()) }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Days</option>
                  {daysOptions.map(dayOption => (
                    <option key={dayOption} value={dayOption}>
                      {dayOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Time</label>
                <select
                  name="time"
                  value={formData.time || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Time</option>
                  {timeOptions.map(timeOption => (
                    <option key={timeOption} value={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Duration</label>
                <select
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map(durationOption => (
                    <option key={durationOption} value={durationOption}>
                      {durationOption} minutes
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-custom-gradient text-white py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {editingClass && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100 ">Edit Class</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Trainer</label>
                <select
                  name="trainer"
                  value={formData.trainer || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Trainer</option>
                  {trainers.map(trainer => (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.firstName} {trainer.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Days</label>
                <select
                  name="days"
                  value={formData.days ? formData.days.join(', ') : ''}
                  onChange={e => setFormData(prevState => ({ ...prevState, days: e.target.value.split(',').map(day => day.trim()) }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Days</option>
                  {daysOptions.map(dayOption => (
                    <option key={dayOption} value={dayOption}>
                      {dayOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Time</label>
                <select
                  name="time"
                  value={formData.time || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Time</option>
                  {timeOptions.map(timeOption => (
                    <option key={timeOption} value={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Duration</label>
                <select
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map(durationOption => (
                    <option key={durationOption} value={durationOption}>
                      {durationOption} minutes
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-custom-gradient text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassTable;
