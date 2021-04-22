const express = require('express');
const tourController = require('../Controllers/tourController');

const router = express.Router();
//const { route } = require('./userRoutes');

// router.param('id', tourController.checkID);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400
// Add it to the post handler stack

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopCheapestTour, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
