const mongoose = require('mongoose');

const url = 'mongodb+srv://user:user@table-ready-f4oyo.mongodb.net/test?retryWrites=true&w=majority';

function connect() {
    mongoose.set('debug', true);
    mongoose.set('useFindAndModify', false);


    return mongoose
        .connect(url, {useNewUrlParser: true})
        .then(msg => {
            console.log(
                ' \n\n-----------------\nsuccessfully connected to Database\n-----------------\n\n'
            );
        })
        .catch(error => console.log(error));
}

module.exports = {
    connect,
    mongoose
};
