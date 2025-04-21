import React from 'react';

const PriceResult = ({ data }) => {
  return (
    <div>
      <h2>Market Price: ${data.price}</h2>
    </div>
  );
};

export default PriceResult;
