import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

const app = express();

app.use(cors());
dotenv.config();

app.use('/api', routes);

app.listen(8881, () => console.log(`Server is listening up at 8881`));
