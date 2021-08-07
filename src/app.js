import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from './config/logger';
import router from './routes';
import initializeDbPostgres from './config/postgres';

const app = express();

app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initializeDbPostgres(() => {});
app.use('/', router);
app.get('*', function(req, res, next) {
  const err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
      req.ip
    }`
  );
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message });
});

export default app;
