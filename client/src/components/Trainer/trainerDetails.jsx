import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const TrainerDetails = () => {
  const { id } = useParams(); // Get trainer ID from URL
  const [trainer, setTrainer] = useState(null); // State to store trainer details
  const [otherTrainers, setOtherTrainers] = useState([]); // State to store other trainers
  const navigate = useNavigate(); // To navigate to other trainers

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trainers/${id}`); // Fetch trainer by ID
        setTrainer(response.data);
      } catch (error) {
        console.error("Error fetching trainer details:", error);
      }
    };

    const fetchOtherTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trainers'); // Fetch all trainers
        const filteredTrainers = response.data.filter(t => t._id !== id); // Exclude current trainer
        setOtherTrainers(filteredTrainers); // Set other trainers
      } catch (error) {
        console.error("Error fetching other trainers:", error);
      }
    };

    fetchTrainer();
    fetchOtherTrainers();
  }, [id]);

  if (!trainer) return <p className="text-center mt-8">Loading...</p>;

  // Navigate to other trainer's details when clicked
  const handleTrainerClick = (trainerId) => {
    navigate(`/trainer/${trainerId}`);
  };

  return (
    <>
    <Navbar/>
  
    <div className="max-w-4xl mx-auto mt-12 p-4">
      {/* Trainer Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:flex">
        {/* Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
  <div className="overflow-hidden rounded-lg shadow-md">
    <img
      src={`http://localhost:5000/uploads/trainers/${trainer.imagePath}`}
      alt={trainer.firstName}
      className="w-full h-[400px] object-cover rounded-lg transform transition duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl"
    />
  </div>
</div>


        {/* Trainer Info Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {trainer.firstName} {trainer.lastName}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {trainer.specialties.join(', ')}
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Email:</strong>{' '}
                <span className="text-gray-700">{trainer.email}</span>
              </p>
              <p className="text-lg">
                <strong>Phone Number:</strong>{' '}
                <span className="text-gray-700">{trainer.phoneNumber}</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-300" />

          {/* Additional Trainer Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              About {trainer.firstName}
            </h2>
            <p className="text-gray-600">
              {trainer.description || 'This trainer is experienced in various training programs and offers personalized coaching.'}
            </p>
          </div>
        </div>
      </div>

      {/* Other Trainers Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Other Trainers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherTrainers.map(otherTrainer => (
            <div
              key={otherTrainer._id}
              className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-200"
              onClick={() => handleTrainerClick(otherTrainer._id)}
            >
              <img
                src={`http://localhost:5000/uploads/trainers/${otherTrainer.imagePath}`}
                alt={otherTrainer.firstName}
                className="w-full h-[250px] object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {otherTrainer.firstName} {otherTrainer.lastName}
              </h3>
              <p className="text-gray-600">{otherTrainer.specialties.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TrainerDetails;
