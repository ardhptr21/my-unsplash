import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors);

app.get('/', (_, res) => res.send('Hello World!'));

app.get('/photos', (req, res) => {});

app.post('/photos', () => {});

app.delete('/photos/d/:label', (req, res) => {});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => `Server running on port ${PORT}`);
