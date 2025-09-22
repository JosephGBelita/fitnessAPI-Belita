const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
require('dotenv').config();

const app = express()
const port = 4000;

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
  
    origin: ['http://localhost:3000'],
    credentials: true, 
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

if(require.main === module){
    app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = { app, mongoose};
