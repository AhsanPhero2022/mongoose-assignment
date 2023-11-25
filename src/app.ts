import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// api/v1/students/create-student
// application routes
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

export default app;
