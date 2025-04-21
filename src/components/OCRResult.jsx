import React, { useEffect } from 'react';
import axios from 'axios';

const OCRResult = ({ data, setPriceData }) => {
  const { cardName } = data;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`/api/price/${cardName}`);
        setPriceData(response.data);
      } catch (err) {
        console.error('Error fetching price:', err);
      }
    };

    fetchPrice();
  }, [cardName, setPriceData]);

  return (
    <div>
      <h2>Card Identified: {cardName}</h2>
    </div>
  );
};

export default OCRResult;
