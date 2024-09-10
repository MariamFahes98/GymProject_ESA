// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import Home3 from './components/home3'; // Ensure correct case for the component
import Infor from './components/Infor';   // Ensure correct case for the component
import MainContent from './components/MainContent';
import Sign from './components/Sign';

import Home from './components/Home'; 
import Home2 from './components/Home2';
import SettingsForm from './components/SettingsForm';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import HeroFooter from './components/HeroFooter';
import MainPage from './components/MainPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/mainpage" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home3" element={<Home3 />} />
        <Route path="/infor" element={<Infor />} />  {/* Ensure correct route name */}
        <Route path="/MainContent" element={<MainContent />} />
        <Route path="/Sign" element={<Sign />} />

        <Route path="/MainPage" element={<MainPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/settingsForm" element={<SettingsForm />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/herofooter" element={<HeroFooter />} />
      </Routes>
    </Router>
  );
};

export default App;


/*
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';

import Home3 from './components/home3';
import Info from './components/Info';



import Home from './components/Home'; 
import Home2 from './components/Home2'; // Importer le nouveau composant Home2
import SettingsForm from './components/SettingsForm';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

import Dashboard from './components/Dashboard';
import HeroFooter from './components/HeroFooter'; // Importer le nouveau composant
//import Information from './components/Infor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home3" />} /> {/* Redirige vers /home *//*}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home3" element={<Home3 />} /> 
        <Route path="/Info" element={<Info />} /> 


        <Route path="/home" element={<Home />} /> 
        <Route path="/home2" element={<Home2 />} /> {/* Ajouter la nouvelle route pour Home2 *//*}
        

        {
        /* 
        hon dashboard hiyi merger la 2 page lal settingsForm + sidebar 
        [w fini e3mal aw /settings aw /dashboard fa sar teftah el 2 sawa]
        */
       /* }
        /*<Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />

        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/settingsForm" element={<SettingsForm />} />

        <Route path="/hero" element={<HeroSection />} />
        <Route path="/footer" element={<Footer />} />
        {/*
         hyade heroFooter hiyi merge ben el tenen page heroSection wl footer
         w bi run behot /herofooter bteftah el tenen sawa
         *//*}
        <Route path="/herofooter" element={<HeroFooter />} /> {/* Ajouter la nouvelle route *//*}

      </Routes>
    </Router>
  );
};

export default App;
*/



























/*// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'; // Assurez-vous que le composant Home existe
import SettingsForm from './components/SettingsForm';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import footer from './components/Footer';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* Page d'accueil après la connexion *//*}
        <Route path="/sidebar" element={<Siderbar/>} />
        <Route path="/settingsForm" element={<SettingsForm/>} />
        <Route path="/sidebar" element={<Hero/>} />
      </Routes>
    </Router>
  );
};

export default App;
*/