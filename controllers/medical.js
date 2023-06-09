const catchAsyncError = require("../middleware/catchAsyncError");
const medicalModel = require("../models/medical");
const ErrorHandler = require("../utils/ErrorHandler");

const route = require("express").Router();

route.post("/new_medical", async (req, res, next) => {
  
  try {
    const { name, email, time, tel } = req.body;
    const newMedical = new medicalModel({
      name,
      email,
      tel,
      time,
    });
    medicalModel.create(newMedical).then((RESPONSE)=>{
      res.status(200).json({ message: 'medical created successfully' });
    }) 
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).send("An error occurred");;
  }
});

// update
route.put(
  "/update_medical/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateMedical = await medicalModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateMedical);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete

route.delete(
  "/delete_medical/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await medicalModel.findByIdAndDelete(id);
      res.status(200).json({ message: "medical is deleted" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all

// route.get(
//   "/get_all_medical",
//   catchAsyncError(async (req, res, next) => {
//     const medical = await medicalModel.find({});
//     medical && res.status(200).json(medical);
//   })
// );
const getAllMedical = async (req, res, next) => {
  try {
    const medical = await medicalModel.find({});

    if (medical.length === 0) {
      return res.status(404).json({ message: 'No medical data found.' });
    }

    res.status(200).json(medical);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

route.get('/get_all_medical', catchAsyncError(getAllMedical));

// get one

route.get(
  "/get_one_medical/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.body.id;
    try {
      const medical = await medicalModel.findOne(id);
      res.status(200).json(medical);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = route;
