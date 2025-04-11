const express=require('express');
const analyticsRouter = require('./router/analyticsRoutes.js')
const urlRouter=require('./router/routes.js');
const app=express();
const path = require('path');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlDb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/',analyticsRouter);
app.use('/',urlRouter);

const port=5000;

app.listen(port,()=>{
    console.log(`application listening on port ${port}`);
})




