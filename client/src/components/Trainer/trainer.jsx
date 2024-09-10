import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const MultiCarousel = forwardRef((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(3);
  const [trainers, setTrainers] = useState([]); // State to store trainers
  const navigate = useNavigate();

  // Navigate to trainer details when clicked
  const handleTrainerClick = (trainerId) => {
    navigate(`/trainer/${trainerId}`); // Redirect to the trainer's details page
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trainers'); // API URL
        setTrainers(response.data); // Set trainers data
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers(); // Fetch trainers when component mounts
  }, []);

  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth < 640) {
        setImagesPerSlide(1); // Mobile view
      } else if (window.innerWidth < 1024) {
        setImagesPerSlide(2); // Tablet view
      } else {
        setImagesPerSlide(3); // Desktop view
      }
    };

    updateImagesPerSlide(); // Set initial value
    window.addEventListener("resize", updateImagesPerSlide);

    return () => {
      window.removeEventListener("resize", updateImagesPerSlide);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trainers.length - imagesPerSlide ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trainers.length - imagesPerSlide : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto" ref={ref}>
      {/* Header */}
      <div className="relative mb-8 px-4 sm:px-0 flex flex-col sm:flex-row justify-between items-center">
        <div className="relative">
          <span className="block text-4xl sm:text-8xl text-gray-400 font-bold select-none opacity-25">
            Best Team
          </span>
          <span className="absolute top-2 sm:top-12 left-0 sm:left-auto transform w-full sm:w-52 text-lg sm:text-2xl font-bold text-black">
            Having Your Own Coach and Mentor
          </span>
        </div>
        {/* Arrows for larger screens */}
        <div className="hidden sm:flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={prevSlide}
            className="p-2 h-12 w-12 flex items-center justify-center text-white bg-gray-700 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="p-2 h-12 w-12 flex items-center justify-center text-white bg-gray-700 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden mt-4 mb-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / imagesPerSlide)}%)`,
          }}
        >
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 px-2 box-border ${
                imagesPerSlide === 1 ? "w-full" : "sm:w-1/2 md:w-1/3"
              }`}
              onClick={() => handleTrainerClick(trainer._id)} // Add onClick handler
              style={{ cursor: 'pointer' }} // Show clickable cursor
            >
              <img
                src={`http://localhost:5000/uploads/trainers/${trainer.imagePath}`} 
                alt={trainer.name}
                className="w-full h-[350px] sm:h-[300px] object-cover rounded-[30px] mx-auto hover:scale-105 hover:rotate-1 hover:shadow-xl"
   
              />

              {/* Arrows for mobile screens */}
              {imagesPerSlide === 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-[45%] transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    style={{ marginLeft: "10px" }}
                  >
                    &lt;
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-[45%] transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    style={{ marginRight: "10px" }}
                  >
                    &gt;
                  </button>
                </>
              )}

              <h1 className="font-bold text-lg md:text-xl text-center mt-2">
                {trainer.firstName} {trainer.lastName}
              </h1>
              <p className="mt-1 text-slate-400 text-center">{trainer.specialties}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MultiCarousel;
