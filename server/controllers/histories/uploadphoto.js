const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    // // console.log("hello");
    // // console.log(req.file);
    // const photoInfo = await photo.create({
    // //   // history_id: 1001,
    //   image_name: req.file.location,
    // });
    // console.log(photoInfo);
    console.log(req.file.location);
    console.log(JSON.parse(req.body.historyInfo));
    

    return res.status(201).json({
      // data: {
        // location: req.file.location,
      // },
      message: "ok",
    });
  } catch (err) {
    console.error(err);
    res.send("error");
  }
};
