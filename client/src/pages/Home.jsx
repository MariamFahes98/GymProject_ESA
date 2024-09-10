import React, { useRef } from 'react';
import Aboutus from '../components/Aboutus/index.jsx';
import Trainer from '../components/Trainer/trainer.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import MainContent from '../components/MainContent/MainContent.jsx';
import Information from '../components/Information/Information.jsx';
import Footer from '../components/Footer/Footer.jsx';
import HeroSection from '../components/Hero/HeroSection.jsx';
import Map from '../components/Map/Map.jsx';
import Services from '../components/Services/Services.jsx';
import Facilities from '../components/Facilities/Facilities.jsx';

function Home() {
   const trainersRef = useRef(null);
   const aboutUsRef = useRef(null);  // Reference for the About Us section
   const mapRef = useRef(null);
   const serviceRef=useRef(null);

   const scrollToSection = (ref) => {
     if (ref && ref.current) {
       ref.current.scrollIntoView({ behavior: 'smooth' });
     }
   };

   return (
     <div>
 
       {/* Pass the onAboutUsClick prop to Navbar */}
       <Navbar onAboutUsClick={() => scrollToSection(aboutUsRef)}
        onServicesClick={() => scrollToSection(serviceRef)} />
       <MainContent />
       
       <Information 
         onTrainersClick={() => scrollToSection(trainersRef)}
         onMapClick={() => scrollToSection(mapRef)} 
       />
       
       <Aboutus ref={aboutUsRef} />
       <Facilities/>
       <Trainer ref={trainersRef} />
       <HeroSection />
      
       <Services ref={serviceRef} />
       <Map ref={mapRef} />
       <Footer />
     </div>
   );
}

export default Home;

