const catchAsyncError = require("../middleware/catchAsyncError");
const foodModel = require("../models/food");
// const ErrorHandler = require("../utils/ErrorHandler");


const route = require("express").Router();

route.post("/create_food", async (req, res, next) => {

  try {
    const { nom, tel, email, time, genre } = req.body;
    const newFood = new foodModel({
      id,
      nom,
      tel,
      email,
      time,
      genre,
    });
    foodModel.create(newFood).then((RESPONSE)=>{
      res.status(200).json({ message: 'food created successfully' });
    }) 
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).send("An error occurred");  }
});

route.put(
  "/update_food/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateFood = await foodModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateFood);
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).send("An error occurred");  }
  })
);

route.delete(
  "/delete_food/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await foodModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Food is deleted." });
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).send("An error occurred");  }
  })
);

const allFoods = async (req, res, next) => {
  try {
    const foods = await foodModel.find({});

    if (foods.length === 0) {
      return res.status(404).json({ message: 'No foods found.' });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

route.get('/all_food', catchAsyncError(allFoods));

route.get(
  "/get_food/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const food = await foodModel.findById(id);
      res.status(200).json(food);
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).send("An error occurred");  }
  })
);


module.exports = route;
