const { photo } = require("../../models");

module.exports = async (req, res) => {
<<<<<<< HEAD
  try {
    // // console.log("hello");
    // // console.log(req.file);
    // const photoInfo = await photo.create({
    // //   // history_id: 1001,
    //   image_name: req.file.location,
    // });
    // console.log(photoInfo);

    console.log(req.file.location);
    return res.status(201).json({
      data: {
        location: req.file.location,
      },
      message: "ok",
    });
  } catch (err) {
    console.error(err);
    res.send("error");
  }
};
=======
    try {
      // // console.log("hello");
      // // console.log(req.file);
      // const photoInfo = await photo.create({
      // //   // history_id: 1001,
      //   image_name: req.file.location,
      // });
      // console.log(photoInfo);
      console.log(`4: ${req.file}`)
      console.log(req.body)



      return res.status(201).json({
        data: {
          location: req.file.location
        },
        message: "ok"
      })
    } catch (err) {
      console.error(err);
      res.send("error");
    }
};
>>>>>>> 52d133b3b9b556d80cd603170075a6e9de64b979
