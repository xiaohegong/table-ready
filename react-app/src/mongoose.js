const mongoose = require('mongoose');

// connect to our database
mongoose.connect('mongodb://trtest1tor:XeNetQxjzUPT8ine4z0VNCjD6R5S4WJwii8cXuRJ0z7aBqbd46An3Ndf7FX8Js1x9tAyihpL5X8tFbtpy18qHw==@trtest1tor.documents.azure.com:10255/?ssl=true/TableReady', {  useUnifiedTopology: true ,useNewUrlParser: true});

// mongoose.set('useFindAndModify', false);
// Used for silent warning -
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open',function () {
    console.log('Connection has been made');
});
module.exports = { mongoose };