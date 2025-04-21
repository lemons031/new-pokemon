import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import OCRResult from './components/OCRResult';
import PriceResult from './components/PriceResult';

const App = () => {
  const [ocrData, setOcrData] = useState(null);
  const [priceData, setPriceData] = useState(null);

  return (
    <div>
      <h1>Pokémon Card Price Checker</h1>
      <ImageUpload setData={setOcrData} />
      {ocrData && <OCRResult data={ocrData} setPriceData={setPriceData} />}
      {priceData && <PriceResult data={priceData} />}
    </div>
  );
};

export default App;
