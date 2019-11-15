const mongoose = require("mongoose");

const url =
  "mongodb+srv://admin:admin@cluster0-hopsi.mongodb.net/table_ready?retryWrites=true&w=majority";

function connect() {
  mongoose.set("debug", true);

  return mongoose
    .connect(url, { useNewUrlParser: true })
    .then(msg => {
      console.log(
        " \n\n-----------------\nsuccessfully connected to Database\n-----------------\n\n"
      );
    })
    .catch(error => console.log(error));
  //   return mongoose.connect(
  //     url,
  //     {
  //       auth: {
  //         user: "trtest1tor",
  //         password:
  //           "XeNetQxjzUPT8ine4z0VNCjD6R5S4WJwii8cXuRJ0z7aBqbd46An3Ndf7FX8Js1x9tAyihpL5X8tFbtpy18qHw=="
  //       }
  //     },
  //     function(err, db) {
  //       if (!err) {
  //         console.log("Successfully connected to database");
  //       }
  //     }
  //   );
}

module.exports = {
  connect,
  mongoose
};
