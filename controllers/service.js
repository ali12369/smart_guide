const catchAsyncError = require("../middleware/catchAsyncError");
const serviceModel = require("../models/service");
const ErrorHandler = require("../utils/ErrorHandler");

const route = require("express").Router();

route.post("/add_service", async (req, res, next) => {
  
  try {
    const { nom, tel, email, time } = req.body;
    const newService = new serviceModel({
      nom,
      tel,
      email,
      time,
    });
    serviceModel.create(newService).then((RESPONSE)=>{
      res.status(200).json({ message: 'service created successfully' });
    }) 
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).send("An error occurred");
  }
  
});

// update Service

route.put(
  "/update_service/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateService = await serviceModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateService);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

route.delete(
  "/delete_service/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await serviceModel.findByIdAndDelete(id);
      res.status(200).json({ message: "service is deleted" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all

// route.get(
//   "/all_services",
//   catchAsyncError(async (req, res, next) => {
//     const services = await serviceModel.find({});
//     services && res.status(200).json(services);
//   })
// );
const allServices = async (req, res, next) => {
  try {
    const services = await serviceModel.find({});

    if (services.length === 0) {
      return res.status(404).json({ message: 'No services found.' });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

route.get('/all_services', catchAsyncError(allServices));


// get one service
route.get(
  "/get_service/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const service = await serviceModel.findById(id);
      res.status(200).json(service);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = route;
