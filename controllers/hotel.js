const catchAsyncError = require("../middleware/catchAsyncError");
const hotelModel = require("../models/hotels");
const ErrorHandler = require("../utils/ErrorHandler");
const route = require("express").Router();

route.post("/add_hotel", async (req, res, next) => {
  
  try {
    const { nom, tel, email, time, qualibre } = req.body;
    const newHotel = new hotelModel({
      nom,
      email,
      tel,
      time,
      qualibre,
    });
    hotelModel.create(newHotel).then((RESPONSE)=>{
      res.status(200).json({ message: 'hotel created successfully' });
    }) 
    
  } catch (error) 
  {console.error(error); // Log the error to the console
  res.status(500).send("An error occurred");
  }
});

// update hotel

route.put(
  "/update_hotel/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateHotel = await hotelModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updateHotel);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete Hotel

route.delete(
  "/delete_hotel/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await hotelModel.findByIdAndDelete(id);
      res.status(200).json({ message: "hotel is deleted!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all hotels

// route.get(
//   "/all_hotels",
//   catchAsyncError(async (req, res, next) => {
//     const hotels = await hotelModel.find({});
//     hotels && res.status(200).json(hotels);
//   })
// );
const allHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find({});

    if (hotels.length === 0) {
      return res.status(404).json({ message: 'No hotels found.' });
    }

    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

route.get('/all_hotels', catchAsyncError(allHotels));


// get one hotel

route.get(
  "/one_hotel/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const hotel = await hotelModel.findById(id);
      res.status(200).json(hotel);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = route;
