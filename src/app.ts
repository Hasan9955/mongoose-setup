import { userRoutes } from './app/modules/user/user.route';
import { StudentRoutes } from './app/modules/student/student.route';
import express, { Request, Response } from 'express';
import cors from 'cors'; 
import globalErrorHandler from './app/Middlewares/globalErrorHandler';
import notFound from './app/Middlewares/notFound';
import router from './app/Routes';
const app = express();



//parsers
app.use(express.json());
app.use(cors());



//application routes
app.use('/api/v1', router) 




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler)

app.use(notFound)

export default app;
