import React, { useState } from 'react';
import Modal from 'react-modal';

// Example data
const initialClasses = [
  { id: 1, name: 'Yoga ', trainer: 'Alice', date: '2024-08-15', time: '09:00 AM', duration: '1h' },
  { id: 2, name: 'Spin Class', trainer: 'Bob', date: '2024-08-16', time: '10:00 AM', duration: '45m' },
  { id: 3, name: 'Advanced Pilates', trainer: 'Charlie', date: '2024-08-17', time: '11:00 AM', duration: '1h 30m' },
  // Add more classes as needed
];

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    maxWidth: '500px',
  },
};

const ClassTable = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const openModal = (classItem) => {
    setEditingClass(classItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingClass(null);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const { name, trainer, date, time, duration } = event.target.elements;
    setClasses(classes.map((classItem) =>
      classItem.id === editingClass.id
        ? { ...classItem, name: name.value, trainer: trainer.value, date: date.value, time: time.value, duration: duration.value }
        : classItem
    ));
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter((classItem) => classItem.id !== id));
    }
  };

  return (
    <div className="p-6 bg-custom-gradient w-full rounded-lg shadow ">
      <h2 className="text-2xl font-bold mb-4">Gym Classes Schedule</h2>
      <div className="overflow-auto rounded-lg shadow w-full ">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-purple-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Class Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Trainer</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-pink-100 divide-y divide-gray-200">
            {classes.map((classItem, index) => (
              <tr key={classItem.id} className={index % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{classItem.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.trainer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  <button
                    onClick={() => openModal(classItem)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classItem.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Class Modal"
      >
        <h2 className="text-xl font-bold mb-4">Edit Class</h2>
        {editingClass && (
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Class Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editingClass.name}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Trainer</label>
              <input
                type="text"
                name="trainer"
                defaultValue={editingClass.trainer}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={editingClass.date}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                defaultValue={editingClass.time}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                name="duration"
                defaultValue={editingClass.duration}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-4 px-4 py-2 bg-gray-300 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>
 
    </div>
    
  );
};

export default ClassTable;
