const catchAsyncError = require("../middleware/catchAsyncError");
const adminstrationModel = require("../models/adminstration");
const ErrorHandler = require("../utils/ErrorHandler");

const route = require("express").Router();

route.post("/new_adminstation", async (req, res, next) => {
  
  
 
    try {
        const administration = await adminstrationModel.create(req.body)
        res.status(200).json(administration);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// update

route.put(
  "/update_adminstration/:id",
  catchAsyncError(async (req, res, next) => {
    
    try {
      const id = req.params.id;
      const updateAdminstration = adminstrationModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateAdminstration);
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).send("An error occurred"); 
    }
  })
);

// delete

route.delete(
  "/delete_adminstration/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await adminstrationModel.findByIdAndDelete(id);
      res.status(200).json({ message: "adminstration is deleted" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all
// route.get(
//   "/get_all_adminstrations",
//   catchAsyncError(async (req, res, next) => {
//     const adminstration = await adminstrationModel.find({});
//     adminstration && res.status(200).json(adminstration);
//   })
// );
const allAdministrations = async (req, res, next) => {
  try {
    const administrations = await adminstrationModel.find({});

    if (administrations.length === 0) {
      return res.status(404).json({ message: 'No administrations found.' });
    }

    res.status(200).json(administrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

route.get('/get_all_administrations', catchAsyncError(allAdministrations));


// get one

route.get(
  "/adminstration/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const adminstration = await adminstrationModel.findOne(id);
      res.status(200).json(adminstration);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = route;
