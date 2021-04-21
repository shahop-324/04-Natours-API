const morgan = require('morgan');
const express = require('express');

const tourRouter = require(`./Routes/tourRoutes`);
const userRouter = require(`./Routes/userRoutes`);

const app = express();

// 1. MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json()); // Middleware // use method is used to add middlewares to our middleware stack
app.use(express.static(`${__dirname}/public`));


// Remember that in each middleware we have access to request and response objects.
// We also have access to a special function next() to call next middleware in our middleware stack

app.use((req, res, next) => {
  // Middleware since use method is applied
  console.log('Hello from the middleware 👋🏻');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. ROUTES

app.use('/api/v1/tours', tourRouter); // Middleware used only on tours resource
app.use('/api/v1/users', userRouter); // Middleware used only on users resource

module.exports = app;
