/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const mongosanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');

const tourRouter = require(`./Routes/tourRoutes`);
const userRouter = require(`./Routes/userRoutes`);
const APIFeatures = require('./utils/apiFeatures');

const app = express();

// 1. GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// console.log(process.env.NODE_ENV);
// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit Request rate from same IP
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: 'Too many Requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Middleware // use method is used to add middlewares to our middleware stack

// Data sanitization against NoSQL query injection
app.use(mongosanitize());

// Data sanitization against XSS
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Remember that in each middleware we have access to request and response objects.
// We also have access to a special function next() to call next middleware in our middleware stack

// Test Middlewares
app.use((req, res, next) => {
  // Middleware since use method is applied
  console.log('Hello from the middleware 👋🏻');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3. ROUTES

app.use('/api/v1/tours', tourRouter); // Middleware used only on tours resource
app.use('/api/v1/users', userRouter); // Middleware used only on users resource

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
