import express from 'express';
import multer from 'multer';
import axios from 'axios';
import { createReadStream } from 'fs';
import { VisionServiceClient } from '@google-cloud/vision';
import cors from 'cors'; // Import CORS

const app = express();
const upload = multer({ dest: 'uploads/' });
const visionClient = new VisionServiceClient();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.static('public'));

app.post('/api/ocr', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const [result] = await visionClient.textDetection({ image: { source: { filename: filePath } } });
    const cardName = result.textAnnotations[0].description;
    res.json({ cardName });
  } catch (error) {
    res.status(500).json({ error: 'OCR processing failed.' });
  }
});

app.get('/api/price/:cardName', async (req, res) => {
  const { cardName } = req.params;

  try {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardName}`, {
      headers: {
        'X-Api-Key': 'f0e99e48-7e24-4cf5-98d4-f4414a3ff913',
      },
    });
    res.json({ price: response.data.data[0].marketPrice });
  } catch (error) {
    res.status(404).json({ error: 'Card not found.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
