import React from 'react';
import styles from './Facilities.module.css'; // Import CSS module
import men from '../../assets/images/men.png';

const Facilities = () => {
  return (
    <div className={styles.container}>
      <div className={styles['background-text']}>Facilities</div> {/* Use module className */}
      <div className={styles['image-container']}>
        <img src={men} alt="Description" className={styles['full-height-image']} />
      </div>
      <div className={styles.content}>
        <p>At our gym, we offer a diverse range of facilities to cater to all fitness enthusiasts. Our dedicated spaces for yoga, karate, and gymnastics provide specialized environments for these disciplines, ensuring you have the best experience whether you're practicing mindfulness, honing your martial arts skills, or working on your flexibility and strength. For those focused on bodybuilding, our gym is equipped with state-of-the-art strength training equipment and free weights, designed to help you achieve your muscle-building goals. No matter your fitness passion, our gym has the facilities to support and enhance your journey.</p>
      </div>
    </div>
  );
};

export default Facilities;
