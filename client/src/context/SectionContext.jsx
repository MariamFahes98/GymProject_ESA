// context/SectionContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SectionContext = createContext();

export const useSection = () => useContext(SectionContext);

const SectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export default SectionProvider;
