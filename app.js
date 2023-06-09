const express = require("express");
const userRoute = require("./controllers/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
// const ErrorHandler = require("./utils/ErrorHandler");
const hotelRoute = require("./controllers/hotel");
const serviceRoute = require("./controllers/service");
const adminstrationRoute = require("./controllers/adminstration");
const foodRoute = require("./controllers/food");
const medicalRoute = require("./controllers/medical");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}
app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("/service", serviceRoute);
app.use("/adminstration", adminstrationRoute);
app.use("/food", foodRoute);
app.use("/medical", medicalRoute);
// app.use(ErrorHandler);


app.get('/api/content', (req, res) => {
  const category = req.query.category;
  let content;

  // Call relevant controller function based on category
  if (category === 'hotels') {
    content = hotelRoute.allHotels() ;
  } else if (category === 'food') {
    content = foodRoute.allFoods() ; 
  } else if (category === 'medical') {
    content = medicalRoute.allMerdical();
  } else if (category === 'service') {
    content = serviceRoute.allServices();
  } else if (category === 'administration') {
    content = administrationRoute.allAdministrations();
  } 

  // Return content in response
  res.json(content);
});


// Other middleware and configurations

app.post('/create_food', (req, res) => {
 
  const {id ,  nom, tel, email, time, genre } = req.body;

  
  res.status(200).json({ message: 'Food created successfully' });
});
app.post('/new_adminstation', (req, res) => {
 
 

  
  res.status(200).json({ message: 'administration created successfully' });
});

app.post('/new_medical', (req, res) => {
 
  const {  nom, tel, email, time } = req.body;

  
  res.status(200).json({ message: 'medical created successfully' });
});
app.post('/add_service', (req, res) => {
 
  const {  nom, tel, email, time } = req.body;

  
  res.status(200).json({ message: 'service created successfully' });
});
app.post('/create_user', (req, res) => {
 
 

  
  res.status(200).json({ message: 'user created successfully' });
});
app.get('/get_all_food', (req, res) => {
 
  const { id , nom, tel, email, time, genre } = req.body;

  
  res.status(200).json({ message: 'Food created successfully' });
});


// Other routes and middleware

// Start the server



// Example data - replace with your actual data source
const items = [
  { id: 1, name: 'pizza' },
  { id: 2, name: 'burger' },
  { id: 3, name: 'pasta' }
];

// Retrieve all items
app.get('/all_food', (req, res) => {
  res.json(items);
});

// Retrieve an item by ID
app.get('/get_food/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start the server

module.exports = app;
