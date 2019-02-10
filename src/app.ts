if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';

import './utils/passport';
import { handleErrors } from './middlewares/error-handlers';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import groupRoutes from './routes/group';
import contactRoutes from './routes/contact';

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    keys: process.env.COOKIE_KEY ? [process.env.COOKIE_KEY] : [],
    maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 = 30 days
    name: 'session',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/contact', contactRoutes);

app.use(handleErrors);

export default app;
