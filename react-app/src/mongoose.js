const mongoose = require('mongoose');

const url = "mongodb://trtest1tor.documents.azure.com:10255/?ssl=true";

function connect() {
    mongoose.set('debug', true);
    return mongoose.connect(url, {
        auth: {
            user: 'trtest1tor',
            password: 'XeNetQxjzUPT8ine4z0VNCjD6R5S4WJwii8cXuRJ0z7aBqbd46An3Ndf7FX8Js1x9tAyihpL5X8tFbtpy18qHw==',
        }
    }, function (err, db) {
        if (!err) {
            console.log("Successfully connected to database");
        }
    });
}

module.exports = {
    connect,
    mongoose
};
