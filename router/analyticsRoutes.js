const {getData}=require('../controllers/urlControllers');
const express=require('express');
const analyticsRouter=express.Router();

analyticsRouter.get('/analytics', getData);

module.exports = analyticsRouter;