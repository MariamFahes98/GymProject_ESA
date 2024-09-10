import React from 'react';
import { useNavigate } from 'react-router-dom';
import runningimg from "../../assets/images/running2.png";
import './about.css';

const Aboutus = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/register');
  };

  return (
    <div ref={ref} id="about-us">
      <div className="md:ml-[700px]">
        <div className="w-80 h-32 bg-gradient-to-r from-violet-200 to-pink-200 rounded-b-full shadow-lg transform -translate-y-1/2 translate-x-1/2 mt-24"></div>
      </div>
      <div className="space-x-16 justify-center md:flex">
        <div className="w-full md:w-1/2 md:ml-10">
          {/* Apply the right-left animation class */}
          <img className="w-80 md:w-[500px] md:h-[400px] md:mr-40 image-move" src={runningimg} alt="running" />
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <span className="text-4xl block md:text-8xl text-gray-400 font-bold select-none opacity-25">
              ABOUT US
            </span>
            <span className="absolute text-xl top-4 md:top-12 transform w-52 md:text-2xl font-bold text-black">
              Ready to make a change?
            </span>
          </div>
          <p className="w-60 md:w-80 mt-8 text-slate-400">
            At FlexZone, we believe "Strong Starts Here". Our gym is designed to support all fitness levels with expert trainers, modern equipment, and a variety of classes. Whether you're a beginner or a seasoned athlete, FlexZone is here to help you reach your goals and get stronger every day.
          </p>
          <p className="w-60 md:w-80 mt-6 text-slate-400">
            FlexZone provides a variety of classes, advanced equipment, and personalized training to help you reach your fitness goals. Our gym empowers everyone to grow stronger, both physically and mentally.
          </p>
          <button className="w-60 justify-center rounded-lg bg-gray-500 text-white md:w-40 h-10 mt-6 mb-8" onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </div>
    </div>
  );
});

export default Aboutus;

