// MainPage.js
import React from 'react';
import Navbar from './home3';
import MainContent from './MainContent';
import Infor from './Infor';
import HeroFooter from './HeroFooter'; // Assuming you have a HeroFooter component
import './MainPage.css'; // Add styles for the layout

const MainPage = () => {
  const handleClassesClick = () => {
    console.log("Classes clicked");
  };

  const handleProductsClick = () => {
    console.log("Products clicked");
  };

  const handleHomeClick = () => {
    console.log("Home clicked");
  };

  return (
    <div className="main-page">
      <Navbar
        onClassesClick={handleClassesClick}
        onProductsClick={handleProductsClick}
        onHomeClick={handleHomeClick}
      />
      
      <main className="content">
        <MainContent />
      </main>
      
      <section className="infor-section">
        <Infor
          onClassesClick={handleClassesClick}
          onProductsClick={handleProductsClick}
        />
      </section>
      
      <footer>
        <HeroFooter />
      </footer>
    </div>
  );
};

export default MainPage;
