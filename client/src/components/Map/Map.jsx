import React from 'react';

const Map = React.forwardRef((props, ref)=>{
  return (
    <div className="map-container" style={{ width: '100%', height: '400px' }} ref={ref}>
      <iframe
        title="gym-location"
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6623.512467342801!2d35.470367521047585!3d33.89593137089758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f172b23035589%3A0xb1a9cdc8d5568820!2sFitness%20Zone%20-%20Hamra!5e0!3m2!1sen!2slb!4v1725890780459!5m2!1sen!2slb"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
});

export default Map;
