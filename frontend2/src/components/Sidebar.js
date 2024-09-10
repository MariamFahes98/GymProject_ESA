import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faConciergeBell, faEnvelope, faBook, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>FlexZone Gym</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/mainpage">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FontAwesomeIcon icon={faInfoCircle} /> About Us
            </Link>
          </li>
          <li>
            <Link to="/services">
              <FontAwesomeIcon icon={faConciergeBell} /> Services
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </Link>
          </li>
          <li>
            <Link to="/classes">
              <FontAwesomeIcon icon={faBook} /> Classes
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCogs} /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


/*
code vrai sans animation
import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faConciergeBell, faEnvelope, faBook, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>FlexZone Gym</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FontAwesomeIcon icon={faInfoCircle} /> About Us
            </Link>
          </li>
          <li>
            <Link to="/services">
              <FontAwesomeIcon icon={faConciergeBell} /> Services
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </Link>
          </li>
          <li>
            <Link to="/classes">
              <FontAwesomeIcon icon={faBook} /> Classes
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCogs} /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

*/













/*//ici le code sans list et pas link
import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faConciergeBell, faEnvelope, faBook, faCogs } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>FlexZone Gym</h2>
      </div>
      <nav>
        <ul>
          <li><FontAwesomeIcon icon={faHome} /> Home</li>
          <li><FontAwesomeIcon icon={faInfoCircle} /> About Us</li>
          <li><FontAwesomeIcon icon={faConciergeBell} /> Services</li>
          <li><FontAwesomeIcon icon={faEnvelope} /> Contact</li>
          <li><FontAwesomeIcon icon={faBook} /> Classes</li>
          <li><FontAwesomeIcon icon={faCogs} /> Setting</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
*/






















/*import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Capi Creative</h2>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Contact</li>
          <li>Classes</li>
          <li>Setting</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
*/




/*
//1
//ici le code et link 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faConciergeBell, faEnvelope, faBook, faCogs } from '@fortawesome/free-solid-svg-icons';

// Importez vos composants de page ici
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Classes from './pages/Classes';
import Settings from './pages/Settings';

const Sidebar = () => {
  return (
    <Router>
      <div className="sidebar">
        <div className="sidebar-logo">
          <h2>FlexZone Gym</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
            </li>
            <li>
              <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About Us</Link>
            </li>
            <li>
              <Link to="/services"><FontAwesomeIcon icon={faConciergeBell} /> Services</Link>
            </li>
            <li>
              <Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> Contact</Link>
            </li>
            <li>
              <Link to="/classes"><FontAwesomeIcon icon={faBook} /> Classes</Link>
            </li>
            <li>
              <Link to="/settings"><FontAwesomeIcon icon={faCogs} /> Setting</Link>
            </li>
          </ul>
        </nav>
      </div>

     
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/classes" component={Classes} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default Sidebar;
*/
/*
//2
// src/components/Sidebar.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faConciergeBell, faEnvelope, faBook, faCogs } from '@fortawesome/free-solid-svg-icons';

// Correctly import your page components
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Classes from '../pages/Classes';
import Settings from '../pages/Settings';

const Sidebar = () => {
  return (
    <Router>
      <div className="sidebar">
        <div className="sidebar-logo">
          <h2>FlexZone Gym</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
            </li>
            <li>
              <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About Us</Link>
            </li>
            <li>
              <Link to="/services"><FontAwesomeIcon icon={faConciergeBell} /> Services</Link>
            </li>
            <li>
              <Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> Contact</Link>
            </li>
            <li>
              <Link to="/classes"><FontAwesomeIcon icon={faBook} /> Classes</Link>
            </li>
            <li>
              <Link to="/settings"><FontAwesomeIcon icon={faCogs} /> Setting</Link>
            </li>
          </ul>
        </nav>
      </div>

     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default Sidebar;
*/

