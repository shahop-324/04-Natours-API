const express = require('express');
const tourController = require('../Controllers/tourController');
const authController = require('../Controllers/authController');

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

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
